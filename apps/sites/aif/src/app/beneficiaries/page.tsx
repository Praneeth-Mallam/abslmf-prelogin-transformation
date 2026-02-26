import Header from '@/src/components/Header/Header';
import Footer from '@/src/components/Footer/Footer';
import { ABC, abcd, AIFLogo, assetlogo } from "../../components/index";

import TopLaunchHeader from '@/src/components/top-launch-header/TopLaunchHeader';

export default function Home() {
  return (
    <>
      <TopLaunchHeader />
      <Header />
      <main>
      </main>
      <Footer logos={{
        alternateInvestmentsLogo: AIFLogo,
        assetManagementLogo: assetlogo,
        capitalLogo: ABC,
        abcdLogo: abcd,
      }} />
    </>
  );
}
