type GenerateId = () => string;
export const generateId: GenerateId = () => (
    Math.random().toString(16).slice(2) + new Date().getTime().toString(36)
);


//const getCurrentTags = () => {
    //const getWord = title.split(' ')
    //const filter = /\B(#[a-z0-9, a-я0-9]+)(\s|$)/ig;
    //const hash = getWord.map(item => 
        //item.match(filter))
        //.filter(item => {return item !== null})
    //const push = hash.forEach(item => {
        //console.log(item)
        //tags.push(item)
    //})
              
              //console.log(getWord)
              //console.log(hash, 'tags')
              
//}

//const [isFiltered, setIsFiltered] = useState(tasks)
//const filter = (value: string) => {
    //const filteredTasks: any[] = []
    //const arrTasks: any[] =[] 
   // tasks.map(task => 
    //    arrTasks.push(task.tags.filter(item => item === value))
    //)
   // for (let i = 0; i < tasks.length; i++) {
        //if (filteredTasks[i] !== undefined) {
       //     filteredTasks.push(tasks[i])
       // }
    //}
    //setIsFiltered(filteredTasks)
    //console.log(value)
//}
//console.log(isFiltered)