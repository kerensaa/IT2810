import { useEffect, useState } from 'react';
import LandingPageTemplate from '../components/LandingPageTemplate';

function LandingPage() {
  const [sortingOption, setSortingOption] = useState('default');
  const [filterOption, setFilterOption] = useState('default');

  // Get sorting and filter option from URL
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    setSortingOption(urlParams.get('sort') || 'default');
    setFilterOption(urlParams.get('course') || 'default');
  }, []);

  return (
    <LandingPageTemplate
      sortingOption={sortingOption}
      onSortChange={setSortingOption}
      filterOption={filterOption}
      onFilterChange={setFilterOption}
      showSection={true}
    />
  );
}

export default LandingPage;
