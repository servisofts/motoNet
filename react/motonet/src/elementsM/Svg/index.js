import React from 'react';



const isWeb = Platform.OS === 'web';

const Svg =(props)=>{
  
  const Image = props.src;
  const Imagew = props.srcw;
    return (
      <div>
       {
         
          
                !isWeb ?  <Image {...props} />
                : <Imagew style={props.style }/>

            }
      </div>
    );
  
}
export default Svg;
