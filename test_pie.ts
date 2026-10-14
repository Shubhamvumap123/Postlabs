const pieData = [{name: 'Applied', value: 10}, {name: 'Offer', value: 3}];
const offerData = pieData.find(d => d.name === 'Offer');
const offersCount = offerData ? offerData.value : 0;
console.log(offersCount);
