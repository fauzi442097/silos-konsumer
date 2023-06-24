import { IoClose, IoAlertOutline, IoCheckmarkSharp, IoInformationSharp } from "react-icons/io5"

const setIcon = (type) => {
   if ( type == 'success' ) return <IoCheckmarkSharp className='text-2xl text-white' />;
   if ( type == 'warning' ) return <IoAlertOutline className='text-2xl text-white'/>
   if ( type == 'error' ) return <IoClose className='text-2xl text-white'/>;
   return <IoInformationSharp className='text-2xl text-white'/>;
}

const setBgColor = (type, theme) => {
   switch ( type ) {
      case "info":
         return theme == 'light' ? 'bg-dark-blue-logo' : 'bg-[rgb(121,122,221)]';         
      case "success":
         return theme == 'light' ? 'bg-primary' : 'bg-[#50cd89]';    
      case "warning":
          return theme == 'light' ? 'bg-yellow-logo' : 'bg-yellow-500';    
      case "error":
          return "bg-danger";
      default:
         return theme == 'light' ? 'bg-dark-blue-logo' : 'bg-[rgb(121,122,221)]';         
  }
}

const setBgColorProgress = (type, theme) => {
   switch ( type ) {
      case "info":
         return theme == 'light' ? 'rgb(26,27,143)' : 'rgb(121,122,221)';         
      case "success":
         return theme == 'light' ? 'rgb(0,154,75)' : '#50cd89';    
      case "warning":
          return theme == 'light' ? 'rgb(253,208,50)' : 'rgba(234,179,8, 1)';    
      case "error":
          return "#f1416c";
      default:
         return theme == 'light' ? 'rgb(26,27,143)' : 'rgb(121,122,221)';         
  }
}

const setColor = (type, theme) => {
   switch ( type ) {
      case "info" :
         return theme == 'light' ? 'text-dark-blue-logo' : 'text-[rgb(121,122,221)]';   
      case "success":
         return theme == 'light' ? 'text-primary' : 'text-[#50cd89]';   
      case "warning":
         return theme == 'light' ? 'text-yellow-logo' : 'text-yellow-500';   
      case "error" :
          return "text-danger";
      default:
         return theme == 'light' ? 'text-dark-blue-logo' : 'text-[rgb(121,122,221)]';     
  } 
}

const setGradient = (type, theme) => {
   switch ( type ) {
      case "info": 
         return theme == 'light' ? 
            "linear-gradient(90deg, rgba(238,246,255,1) 0%, rgba(238,246,255,1) 0%, rgba(255,255,255,1) 100%)" :
            "linear-gradient(90deg, #1a4a8f 0%, #445e83 0%, #2e4462 100%)"
      case "success" :
         return theme == 'light' ? 
            "linear-gradient(90deg, rgba(154,229,188,1) 0%, rgba(232,255,243,1) 0%, rgba(255,255,255,1) 100%)" :
            "linear-gradient(90deg, rgb(255, 245, 248) 0%, #337154 0%, #304c3c 100%)"
      case "warning" :
         return theme == 'light' ? 
            "linear-gradient(90deg, rgba(255,248,221,1) 0%, rgba(255,248,221,1) 0%, rgba(255,255,255,1) 100%)" :
            "linear-gradient(90deg, #ffc700 0%, #877947 0%, #4c4735 100%)"
      case "error":
         return theme == 'light' ? 
            "linear-gradient(90deg, rgba(255,245,248,1) 0%, rgba(255,245,248,1) 0%, rgba(255,255,255,1) 100%)" :
            "linear-gradient(90deg, rgb(255, 245, 248) 0%, rgb(131 96 107) 0%, #523741 100%)"
      default:
         return theme == 'light' ? 
            "linear-gradient(90deg, rgba(238,246,255,1) 0%, rgba(238,246,255,1) 0%, rgba(255,255,255,1) 100%)" :
            "linear-gradient(90deg, #1a4a8f 0%, #445e83 0%, #2e4462 100%)"
  }
}

const setTitle = (type, title) => {
   if ( !title ) {
      switch ( type ) {
          case 'info': return 'Info'
          case 'success': return 'Sukses'
          case 'warning': return 'Warning'
          case 'error': return 'Error'
          default: 
              return 'Info'
      }
  } else {
      return title;
  }
}

const notificationStyle = {
   setIcon, 
   setBgColor,
   setColor,
   setTitle,
   setGradient,
   setBgColorProgress
}

export default notificationStyle;