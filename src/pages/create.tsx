import React, { useCallback, useState } from 'react';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { NextSeo } from 'next-seo';
import Toggle from 'react-toggle';
import { Field, withTypes } from 'react-final-form';
import { FormApi, getIn } from 'final-form';
// eslint-disable-next-line import/no-named-default
import focusDecorator from 'final-form-focus';

import { BaseLayout } from '@layouts/BaseLayout';

import s from '@styles/Create.module.sass';
import { Heading } from '@components/ui/Heading';
import { Row } from '@components/ui/Row';
import { Container } from '@components/ui/Container';
import { Input } from '@components/ui/Input';
import { Button } from '@components/ui/Button';
import { composeValidators, required } from '@utils/validators';
import { base64ArrayBuffer, convertToHex } from '@utils/helpers';
import { getStorageInfo, useAccountPkh, useTezos } from '@utils/dapp';
import { AUCTION_TOKEN_ADDRESS, FA2_TOKEN_ADDRESS, MARKETPLACE_TOKEN_ADDRESS } from '@utils/defaults';
// eslint-disable-next-line import/no-extraneous-dependencies
import { MichelsonMap } from '@taquito/michelson-encoder';
import BigNumber from 'bignumber.js';

const IPFS = require('ipfs-mini');

const ipfs = new IPFS({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' });

const findInput = (inputs: any, errors: any) => inputs.find((input: any) => {
  const name = input.name || input.id; // <------------ THERE
  return name && getIn(errors, name);
});

// @ts-ignore
const focusOnError = focusDecorator(null, findInput);

// Default stake value
type FormValues = {
  name: string
  description: string
  asset: number
  price?: number
  startPrice?: number
  bidStep?: number
  lifeTime?: number
  bidTime?: number
};

const Create: React.FC = () => {
  const tezos = useTezos();
  const accountPkh = useAccountPkh();
  const [isAuction, setIsAuction] = useState(false);
  const { t } = useTranslation(['common', 'home']);
  const [imageIpfs, setImageIpfs] = useState<string | null>(null);

  // Logic of form
  const { Form } = withTypes<FormValues>();

  const upload = () => {
    const reader = new FileReader();
    reader.onloadend = async () => {
      const photo = document.getElementById('photo');
      // @ts-ignore
      const fileType = photo.files[0].type;

      const prefix = `data:${fileType};base64,`;
      // @ts-ignore
      const buf = Buffer.from(reader.result);
      const base64buf = prefix + base64ArrayBuffer(buf);

      const res = await ipfs.add(base64buf);
      setImageIpfs(`https://ipfs.io/ipfs/${res}`);
    };
    const photo = document.getElementById('photo');
    // @ts-ignore
    reader.readAsArrayBuffer(photo.files[0]);
  };

  const onSubmit = useCallback(async (
    values: FormValues,
    form: FormApi<FormValues>,
  ) => {
    try {
      if (tezos) {
        const firstStage = {
          link: imageIpfs,
          title: values.name,
          description: values.description,
        };
        const json = JSON.stringify(firstStage);
        const hex = convertToHex(json);

        const contract = await tezos.wallet.at(FA2_TOKEN_ADDRESS);
        const tokenMD = MichelsonMap.fromLiteral({ metadata: hex });
        const operation = await contract.methods.mint_token(tokenMD).send();
        await operation?.confirmation();

        const faStorage = await getStorageInfo(
          tezos,
          FA2_TOKEN_ADDRESS,
        );
        const { lastTokenId } = faStorage;
        const neededTokenId = +lastTokenId - 1;
        const operationApprove = await contract.methods.update_operators([{
          add_operator: {
            owner: accountPkh,
            operator: !isAuction ? MARKETPLACE_TOKEN_ADDRESS : AUCTION_TOKEN_ADDRESS,
            token_id: neededTokenId,
          },
        }]).send();
        await operationApprove.confirmation();

        if (!isAuction) {
          if (!values.price) return;
          const contractMarketplace = await tezos.wallet.at(MARKETPLACE_TOKEN_ADDRESS);
          const operationExhibit = await contractMarketplace
            .methods
            .exhibitToken(
              neededTokenId,
              new BigNumber(values?.price).multipliedBy(new BigNumber(10).pow(6)),
            )
            .send({ amount: 500000, mutez: true });
          await operationExhibit.confirmation();
        } else {
          if (!values.startPrice || !values.bidStep || !values.bidTime) return;
          const contractAuction = await tezos.wallet.at(AUCTION_TOKEN_ADDRESS);
          const operationExhibit = await contractAuction
            .methods
            .submitForAuction(
              neededTokenId,
              new BigNumber(values.startPrice).multipliedBy(new BigNumber(10).pow(6)),
              new BigNumber(values.bidStep).multipliedBy(new BigNumber(10).pow(6)),
              values.lifeTime,
              values.bidTime,
            )
            .send({ amount: 500000, mutez: true });
          await operationExhibit.confirmation();

          // @ts-ignore
          // eslint-disable-next-line @typescript-eslint/no-implied-eval
          setTimeout(form.restart);
        }
      }
    } catch (error) {
      console.log(error);
    }
  }, [accountPkh, imageIpfs, isAuction, tezos]);

  return (
    <BaseLayout className={s.container}>
      <NextSeo
        title={t('secondary:Home page')}
        description={t('secondary:Home page description. Couple sentences...')}
        openGraph={{
          title: t('secondary:Home page'),
          description: t('secondary:Home page description. Couple sentences...'),
        }}
      />
      <Container>
        <Row className={s.row}>
          <Heading title="Create NFT Token" />
          <Form
            onSubmit={onSubmit}
            // @ts-ignore
            decorators={[focusOnError]}
            render={({
              handleSubmit, submitting,
            }) => (
              <form onSubmit={handleSubmit}>
                <div className={s.assetWrapper}>
                  <Field
                    name="asset"
                    validate={composeValidators(
                      required,
                    )}
                  >
                    {({ input, meta }) => (
                      <Input
                        {...input}
                        className={s.input}
                        type="file"
                        label="File"
                        placeholder="e.g. My Awesome NFT"
                        error={(meta.touched && meta.error) || meta.submitError}
                        success={!meta.error && meta.touched && !meta.submitError}
                        id="photo"
                      />
                    )}
                  </Field>
                  <Button
                    theme={imageIpfs === null ? 'green' : 'blue'}
                    className={s.buttonImage}
                    onClick={upload}
                  >
                    {imageIpfs === null ? 'Add Image to IPFS' : 'Added!'}
                  </Button>
                </div>
                <Field
                  name="name"
                  validate={composeValidators(
                    required,
                  )}
                >
                  {({ input, meta }) => (
                    <Input
                      {...input}
                      className={s.input}
                      label="Name"
                      placeholder="e.g. My Awesome NFT"
                      error={(meta.touched && meta.error) || meta.submitError}
                      success={!meta.error && meta.touched && !meta.submitError}
                    />
                  )}
                </Field>
                <Field
                  name="description"
                  validate={composeValidators(
                    required,
                  )}
                >
                  {({ input, meta }) => (
                    <Input
                      {...input}
                      className={s.input}
                      textarea
                      label="Description"
                      placeholder="e.g. Some words about my token:"
                      error={(meta.touched && meta.error) || meta.submitError}
                      success={!meta.error && meta.touched && !meta.submitError}
                    />
                  )}
                </Field>
                <div className={s.toggle}>
                  <span>
                    Sale NFT on auction (not fix price)
                  </span>
                  <Toggle
                    defaultChecked={isAuction}
                    icons={false}
                    onChange={() => setIsAuction(!isAuction)}
                  />
                </div>
                {!isAuction ? (
                  <Field
                    name="price"
                    validate={composeValidators(
                      required,
                    )}
                  >
                    {({ input, meta }) => (
                      <Input
                        {...input}
                        className={s.input}
                        label="Price (in XTZ)"
                        placeholder="120"
                        error={(meta.touched && meta.error) || meta.submitError}
                        success={!meta.error && meta.touched && !meta.submitError}
                      />
                    )}
                  </Field>
                ) : (
                  <>
                    <Field
                      name="startPrice"
                      validate={composeValidators(
                        required,
                      )}
                    >
                      {({ input, meta }) => (
                        <Input
                          {...input}
                          className={s.input}
                          label="Start price (in XTZ)"
                          placeholder="120"
                          error={(meta.touched && meta.error) || meta.submitError}
                          success={!meta.error && meta.touched && !meta.submitError}
                        />
                      )}
                    </Field>
                    <Field
                      name="bidStep"
                      validate={composeValidators(
                        required,
                      )}
                    >
                      {({ input, meta }) => (
                        <Input
                          {...input}
                          className={s.input}
                          label="Bid step (in XTZ)"
                          placeholder="1"
                          error={(meta.touched && meta.error) || meta.submitError}
                          success={!meta.error && meta.touched && !meta.submitError}
                        />
                      )}
                    </Field>
                    <Field
                      name="lifeTime"
                      validate={composeValidators(
                        required,
                      )}
                    >
                      {({ input, meta }) => (
                        <Input
                          {...input}
                          className={s.input}
                          label="Sum lifetime (in minutes)"
                          placeholder="60"
                          error={(meta.touched && meta.error) || meta.submitError}
                          success={!meta.error && meta.touched && !meta.submitError}
                        />
                      )}
                    </Field>
                    <Field
                      name="bidTime"
                      validate={composeValidators(
                        required,
                      )}
                    >
                      {({ input, meta }) => (
                        <Input
                          {...input}
                          className={s.input}
                          label="Bid time (in minutes)"
                          placeholder="60"
                          error={(meta.touched && meta.error) || meta.submitError}
                          success={!meta.error && meta.touched && !meta.submitError}
                        />
                      )}
                    </Field>
                  </>
                )}
                <Button
                  type="submit"
                  disabled={submitting || imageIpfs === null}
                >
                  {submitting ? t('common:Loading...') : t('common:Create')}
                </Button>
              </form>
            )}
          />
        </Row>
      </Container>
    </BaseLayout>
  );
};

export const getStaticProps = async ({ locale }: { locale: string }) => ({
  props: {
    ...await serverSideTranslations(locale, ['common', 'home']),
  },
});

export default Create;
