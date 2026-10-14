import { useMemo } from 'react';

// Example of the performance bottleneck
const JobDashboard = () => {
  const jobs = []; // Assuming jobs is available

  // Current approach:
  const offersCount = jobs.filter(j => j.status === 'Offer').length;
  // This executes inline on EVERY render, creating a new array and checking every item even if jobs array didn't change!

  // Better approach:
  const offersCountMemoized = useMemo(() => {
    return jobs.reduce((count, job) => (job.status === 'Offer' ? count + 1 : count), 0);
  }, [jobs]);
  // or simply extracting the length from pieData which is already memoized!
}
