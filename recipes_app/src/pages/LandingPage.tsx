import { mockUsers } from '../mockData/mockData';
import LandingPageTemplate from '../components/LandingPageTemplate';

function LandingPage() {
  return (
    <>
      <LandingPageTemplate dataSource={mockUsers} />
    </>
  );
}

export default LandingPage;
