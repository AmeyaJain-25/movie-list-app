import Head from 'next/head';
import AppUIShell from '~/components/core/AppUIShell';
import PageContainer from '~/components/layout/PageContainer';

const HomePage = () => {
  const pageTitle = 'Page Title';
  const pageDescription = `Page Description`;
  const canonicalUrl = 'https://www.website.com';
  const ogTitle = pageTitle;
  const ogDescription = pageDescription;
  const ogImage = 'https://www.website.com/assets/home/og-image.jpg'; // TODO: Add OG Image
  const ogUrl = canonicalUrl;
  const twitterTitle = pageTitle;
  const twitterDescription = pageDescription;
  const twitterUrl = canonicalUrl;
  const twitterImage = ogImage;

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <link rel="canonical" href={canonicalUrl} />
        <meta name="description" content={pageDescription} />
        <meta property="og:title" content={ogTitle} />
        <meta property="og:description" content={ogDescription} />
        <meta property="og:image" content={ogImage} />
        <meta property="og:site_name" content="WebsiteName" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={ogUrl} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:creator" content="@TwitterUsername"></meta>
        <meta name="twitter:title" content={twitterTitle} />
        <meta name="twitter:description" content={twitterDescription} />
        <meta name="twitter:url" content={twitterUrl} />
        <meta name="twitter:image" content={twitterImage}></meta>
      </Head>
      <AppUIShell>
        <PageContainer>Home page</PageContainer>
      </AppUIShell>
    </>
  );
};

export default HomePage;
