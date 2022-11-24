import toastr from "toastr";
import "toastr/build/toastr.min.css";

const tosterMsg = msg => {
  let toastType;
  toastr.options = {
    positionClass: "toast-top-right",
    timeOut: 5000,
    extendedTimeOut: 1000,
    closeButton: false,
    progressBar: false,
    newestOnTop: true,
    showEasing: "swing",
    hideEasing: "linear",
    showMethod: "fadeIn",
    hideMethod: "fadeOut",
    showDuration: 300,
    hideDuration: 1000,
  };
  if(toastType==="error"){
    toastr.error(msg);

  }else{
    toastr.success(msg)
  }
};

export default tosterMsg;