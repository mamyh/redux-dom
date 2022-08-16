//varriable initializing 

const {parent,counter,increment,decrement,addCounter,reset} = ['parent','counter', 'increment','decrement','addCounter','reset'].reduce((elements,item)=>{
      return {
        ...elements,
        [item]:document.querySelector(`.${item}`)
      }
},{});



const initialValue ={
  counter:[
    {id:1,identity:[identifer(),identifer()+'$'],value:0}
  ]
}

function nextId(counters){
    const maxId = counters.reduce((max, id)=>Math.max(max,id),-1);
    return maxId+1;
}
function identifer(){
  return Math.random().toString(16).slice(2);
}


const counterReducer=(state=initialValue, {type,payload})=>{
    switch(type){
        case 'increment':{
          return{
            ...state,
            counter:state.counter.map(item=>{
               if(item.id === payload.id){
                console
                return{
                  ...item,
                  value:item.value + payload.value
                }
               }
               return{...item}
            })
          }
        }
        case "decrement":{
          return{
            ...state,
            counter:state.counter.map(item=>{
               if(item.id === payload.id){
                return{
                  ...item,
                  value:item.value - payload.value
                }
               }
               return{...item}
            })
          }
        }
        case 'addcounter':{
           return{
            ...state,
            counter:[
              ...state.counter,
              {
                id:nextId(state.counter),
                identity:[identifer(),identifer()+`$`],
                value:0
              }
            ]
           }
        }
        default:
          return {...state}
    }
}

const store= Redux.createStore(counterReducer);

function render(){
  const state=store.getState();
  
  
console.log(state);
state.counter.forEach(item=>{
  const counterEl =`<div class="mx-auto max-w-md mt-10  space-y-5 ">
                    <div
                        data-id =${item.id} class=" max-w-md p-4 h-auto flex flex-col items-center justify-center space-y-5 bg-white rounded shadow "
                      >

                    <div  class="text-2xl font-semibold counter">${item.value}</div>
                    <div class="flex space-x-3">
                        <button
                            class="bg-indigo-400 text-white px-3 py-2 rounded shadow increment"  data-id =${item.id} id=${item.identity[0]}  
                        >
                            Increment
                        </button>
                        <button 
                            class="bg-red-400 text-white px-3 py-2 rounded shadow decrement" data-id =${item.id} id="${item.identity[1]}"
                        >
                            Decrement
                        </button>
                    </div>
                  </div>
  
  </div>`;
    parent.insertAdjacentHTML('beforeend',counterEl);
   
});
state.counter.forEach((item)=>{
  document.getElementById(item.identity[0]).addEventListener('click',()=>{
    store.dispatch({
      type:'increment',
      payload:{
        value:5,
        id:item.id
      }
    })
  });


  document.getElementById(item.identity[1]).addEventListener('click',()=>{
    store.dispatch({
      type:'decrement',
      payload:{
        value:5,
        id:item.id
      }
    })
  });

})

}

render();

function action(type,value=0){
  return {
    type,payload:value
  }
}

function click(element,type){
  element.addEvenetlistener('click',()=>{
    store.dispatch(action(type,5))
  });
}




store.subscribe(render);


