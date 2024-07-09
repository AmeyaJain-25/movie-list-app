import Footer from '~/components/layout/Footer';

const AppUIShell = ({ children }) => {
  return (
    <>
      {children}
      <Footer />
    </>
  );
};

export default AppUIShell;
