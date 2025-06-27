import fs from '../../node_modules/fs-js/index.js'

class fileServices{
    async readfile (file){
    
        const update_data = fs.readFileSync(file);
         const data = JSON.parse(update_data);
         return data
        }
        async writePropInFile(fileName,propName,val){
            const data = await fs.readFileSync(fileName);
            const jsonData = await JSON.parse(data);
            console.log("Before Adding data", JSON.stringify(jsonData, null, 4));
             jsonData.UIDs[propName]= val ;
            const jsonString = JSON.stringify(jsonData);
            await fs.writeFileSync(fileName, jsonString, 'utf-8', (err) => {
               if (err) throw err;
               console.log('Data added to file');
            });
            
        
        }
        

}
export default new fileServices();