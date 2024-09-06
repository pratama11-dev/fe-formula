import Head from "next/head";

function HeadPage({ title, css }: { title: string; css?: string }) {
  return (
    <Head>
      <title>{`${title}`}</title>
      <link rel="stylesheet" type="text/css" href={`/css/${css}`} />
    </Head>
  );
}

export default HeadPage;
