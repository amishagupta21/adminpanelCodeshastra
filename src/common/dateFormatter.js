import moment from "moment";

const dateFormate = (value)=>{
  
return moment(value).format("MMMM D, YYYY")
}

export default dateFormate;