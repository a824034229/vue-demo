export const setTitle = {
  methods: {
    setTitle: function(str){
      if(typeof str === 'string'){
        document.title = str || ''
      }else{
        try{
          document.title = JSON.stringify(str) || ''
        }catch(error){
          document.title = 'error'
          throw new Error(error,'transmit the Variable type cannot JSON.stringify ')
        }
      }
    }
  }
}