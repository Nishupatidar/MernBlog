const Integration = require('../../Model/Add_Blog')
const allData = [
    { id: 1, name: 'Item 1', date: '2024-01-05' }, // Sample date within January
    { id: 2, name: 'Item 2', date: '2024-02-10' }, // Sample date outside January
    // Add more data items
  ];
const Monthlyfilter_controller = async (req,res)=>{
    // console.log(req.query)
   const AllDATA = await Integration.find({})
//    console.log(AllDATA)
    const {startDate,endDate} = req.query;
    if(!startDate || !endDate){
        res.status(400).json({"error": 'Start date and end date parameters are required'})
    }
else{
    const filteredData  = AllDATA.filter((items)=>{
        return items.created_at >=  new Date(startDate) && items.created_at <= new Date (endDate)
    });
        
      
    // console.log(filteredData)
    res.json(filteredData)
}

};
const formatDate = (dateString) => {
  const date = new Date(dateString);
  // console.log(date)
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  console.log(month)
  const year = date.getFullYear().toString();
  console.log(year)
  
  return `${month}/${year}`;
};
const Monthlyfilter_months_controller = async(req,res)=>{
  const selectedMonth = req.query.month;
  // console.log(selectedMonth)
  const AllDATA = await Integration.find({})
  const filteredData = AllDATA.filter(item => {
    const itemMonth = formatDate(item.created_at) ; // Extract month from date (assuming date is in 'yyyy-mm-dd' format)
  //  console.log(itemMonth)
    return itemMonth === selectedMonth;
  });
  res.json(filteredData);

}
const weeklyDatafilter_controller = async (req,res)=>{
    const { week } = req.query;

  if (!week) {
    return res.status(400).json({ error: 'Week parameter is required' });
  }

  // Parse week and calculate start and end dates
  const startDate = new Date(); // Example: Start of the year
console.log(startDate.getMonth()) 
startDate.setDate(startDate.getDate() - 7);  
console.log(startDate)

// Adjust start date based on selected week

const date = startDate.setDate(startDate.getDate() + 7)
console.log(date)
//   startDate.setDate(startDate.getDate() + (parseInt(week) - 1) * 7); // Adjust start date based on selected week
//  console.log(startDate.setDate(startDate.getDate() + (parseInt(week) - 1) * 7))
//   const endDate = new Date(startDate);
//   endDate.setDate(endDate.getDate() + 6); // End of the week
//   console.log(endDate)
//   const AllDATA = await Integration.find({})
//   const filteredData = AllDATA.filter((item) => {
//     const itemDate = new Date(item.created_at);
//     return itemDate >= startDate && itemDate <= endDate;
//   });

  // res.json(filteredData);

}
const Last7daygoto = async(req,res)=>{
  console.log(req.query)
 const {endDate,startDate}  = req.query
  // const endDate = new Date(); // Current date
  // const startDate = new Date();

  // startDate.setDate(startDate.getDate() - 6); // 6 days ago
  const AllDATA = await Integration.find({})
  const filteredData = AllDATA.filter((item) => {
    const itemDate = new Date(item.created_at);
    return itemDate >= new Date(endDate) && itemDate <= new Date(startDate);
   
  });
  // console.log(filteredData)
  res.json(filteredData);
}
const Last30daydata = async(req,res)=>{
const {endDate,startDate}  = req.query
const AllDATA = await Integration.find({})
const filteredData = AllDATA.filter((item) => {
const itemDate = new Date(item.created_at);
return itemDate >= new Date(endDate) && itemDate <= new Date(startDate);
});
res.json(filteredData);

}
const formatyear = (year) =>{
  const date = new Date(year)
  const year1 = date.getFullYear().toString();
console.log(year1)
return year1
}
const yearlydata_filter_controller = async(req,res)=>{
  console.log(req.query.year)
  const selectedMonth = req.query.year;
  // console.log(selectedMonth)
  const AllDATA = await Integration.find({})
  const filteredData = AllDATA.filter(item => {
    const itemMonth = formatyear(item.created_at) ; // Extract month from date (assuming date is in 'yyyy-mm-dd' format)
  //  console.log(itemMonth)
    return itemMonth === selectedMonth;
  });
  console.log(filteredData)
  res.json(filteredData);

}
module.exports = {Monthlyfilter_controller,Monthlyfilter_months_controller,weeklyDatafilter_controller,Last7daygoto,Last30daydata,yearlydata_filter_controller}
   
    
    
    
  
    
    
  
    
    
 
    
