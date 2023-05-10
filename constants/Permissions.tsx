export const PERMISSIONS= {
    title: 'Storage Permission',
    message: 'App needs access to your storage to get videos',
    buttonNeutral: 'Ask Me Later',
    buttonNegative: 'Cancel',
    buttonPositive: 'OK',
  };




  export const Check_Video=(file:any)=>{
    return (
        file.name.toLowerCase().endsWith('.mp4') ||
        file.name.toLowerCase().endsWith('.mov') ||
        file.name.toLowerCase().endsWith('.avi') ||
        file.name.toLowerCase().endsWith('.wmv') ||
        file.name.toLowerCase().endsWith('.flv') ||
        file.name.toLowerCase().endsWith('.mkv') ||
        file.name.toLowerCase().endsWith('.webm')
      );
  }