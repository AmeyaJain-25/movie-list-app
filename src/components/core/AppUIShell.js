import Header from '~/components/layout/Header';
import Footer from '~/components/layout/Footer';

const AppUIShell = ({ children, hideFooter = false }) => {
  return (
    <>
      <Header />
      {children}
      {!hideFooter ? <Footer /> : null}
    </>
  );
};

export default AppUIShell;
