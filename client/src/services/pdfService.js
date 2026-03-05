// Merge PDF API-------------------------------------------------

export const fakeMargePDF = () =>{
    return new Promise ((resolve,reject)=>{
        setTimeout(()=>{
            const isSuccess=Math.random()>0.3; //math.random mlv ye ek random number deta hai 0 or 1 ke bich me

            if(isSuccess){
                resolve("PDFs have been merged! ")
            }else{
                reject("something went wrong!")
            }
               },2000)
        });
};

// Split PDF API-------------------------------------------------

export const splitPDF = ()=>{
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            const isSuccess= Math.random()>0.3;
            if(isSuccess){
                resolve("PDF has been split!")
            }else{
                reject("something went wrong!")
            }
        },2000)
    });
};

// Compress PDF Api-------------------------------------------------

export const compressPDF=()=>{
    return new Promise((resolve,reject)=>{
        setInterval(()=>{
          const isSuccess=Math.random()>0.3;
          if(isSuccess){
            resolve("PDFs have been compressed!")
                  } else{
                    reject("something went wrong!")
                  }
        },2000)
    });
};