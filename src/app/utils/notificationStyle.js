const closeIcon = "<svg xmlns='http://www.w3.org/2000/svg' width='18' height='18' viewBox='0 0 24 24'><path fill='none' stroke='currentColor' strokeLinecap='round' strokeLinejoin='round' strokeWidth='2.5' d='m7 7l10 10M7 17L17 7'/></svg>"
const checkIcon = "<svg xmlns='http://www.w3.org/2000/svg' width='18' height='18' viewBox='0 0 24 24'><path fill='none' stroke='currentColor' strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M20 7L10 17l-5-5'/></svg>"
const ExclamationIcon = "<svg xmlns='http://www.w3.org/2000/svg' width='18' height='18' viewBox='0 0 24 24'><g fill='none' stroke='currentColor'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth='3' d='M13.253 5.98L12 13.5l-1.253-7.52a1.27 1.27 0 1 1 2.506 0Z'/><circle cx='12' cy='19' r='1' strokeWidth='2'/></g></svg>"
const IconIcon = "<svg xmlns='http://www.w3.org/2000/svg' width='18' height='18' viewBox='0 0 16 16'><path fill='currentColor' d='m8.93 6.588l-2.29.287l-.082.38l.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319c.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246c-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0a1 1 0 0 1 2 0z'/></svg>"

const setIcon = (type) => {
   if ( type == 'success' ) return <span className='text-2xl text-white' dangerouslySetInnerHTML={{ __html: checkIcon }}/>;
   if ( type == 'warning' ) return <span className='text-2xl text-white' dangerouslySetInnerHTML={{ __html: ExclamationIcon }}/>
   if ( type == 'error' ) return <span className='text-2xl text-white' dangerouslySetInnerHTML={{ __html: closeIcon }}/>;
   return <span className='text-2xl text-white' dangerouslySetInnerHTML={{ __html: IconIcon }}/>;
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