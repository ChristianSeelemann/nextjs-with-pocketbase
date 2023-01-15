import Head from "next/head";
import useTranslation from "next-translate/useTranslation";

export default function PageHead({ title }: { title: string }) {
  const { t } = useTranslation("common");

  return (
    <Head>
      <title>{t("sitename") + " | " + title}</title>
      <meta name="description" content={t("meta_description")} />
    </Head>
  );
}
