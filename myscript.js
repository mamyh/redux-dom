//varriable initializing 

const {parent,counter,addCounter,reset} = ['parent','counter', 'increment','decrement','addCounter','reset'].reduce((elements,item)=>{
  return {
    ...elements,
    [item]:document.querySelector(`.${item}`)
  }
},{});

//action identifer
const INCREMENT="increment";
const DECREMENT="decrement";
const ADD="addcounter";
const RESET ="reset";
const CLEAR ="clear";


//action creator
function changeTheValue(type=INCREMENT,payload={}){
  return{
  type,payload
  }
}
function changeUi(type=ADD){
  return{
  type
  }
}
//initializing state
const initialValue ={
counter:[
{id:1,identity:[identifer(),identifer()+'$',identifer()+'#'],input:{value:5,id:identifer()+'%'},value:0}
]
}

function nextId(counters){
const maxId = counters.reduce((max, item)=>Math.max(max,item.id),-1);
return maxId+1;
}
function identifer(){
return Math.random().toString(16).slice(2);
}



const counterReducer=(state=initialValue, {type,payload={}})=>{
switch(type){
    case INCREMENT:{
      return{
        ...state,
        counter:state.counter.map(item=>{
           if(item.id === payload.id){
            return{
              ...item,
              value:item.value + payload.value
            }
           }
           return{...item}
        })
      }
    }
    case DECREMENT:{
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
    case ADD:{
       return{
        ...state,
        counter:[
          ...state.counter,
          {
            id:nextId(state.counter),
            identity:[identifer(),identifer()+`$`,identifer()+'#'],
            input:{value:0,id:identifer()+'%'},
            value:0
          }
        ]
       }
    }
    case CLEAR:{
      return {
         ...state,
         counter:state.counter.map(item=>{
          if(item.id === payload.id){           
            return{
              ...item,
              value:0,
              input:{...item.input, value:5}
            }
          }
          return {...item}
         })
      }
    }
    case RESET:{
      return {
        ...state,
        counter:state.counter.map(item=>{
          return{
            ...item,
            value:0
          }
        })
      }
    }
    default:
      return {...state}
}
}

const store= Redux.createStore(counterReducer);

function render(){
const state=store.getState();

console.log(state)
parent.innerHTML=state.counter.map((item)=>{
return `<div class="mx-auto max-w-lg mt-3  space-y-5 ">
                <div
                     class=" max-w-lg p-4 h-auto flex flex-col items-center justify-center space-y-5 bg-white rounded shadow "
                  >

                <div  class="text-2xl font-semibold counter">${item.value.toString()}</div>
                <div class="flex space-x-3">
                    <input class="border w-24"  type="text" id=${item.input.id} /> 
                    <button
                        class="bg-indigo-400 text-white px-3 py-2 rounded shadow increment"  id=${item.identity[0]}  
                    >
                        Increment
                    </button>
                    <button 
                        class="bg-red-400 text-white px-3 py-2 rounded shadow decrement" id="${item.identity[1]}"
                    >
                        Decrement
                    </button>
                    <button 
                        class="bg-red-400 text-white px-3 py-2 rounded shadow decrement" id="${item.identity[2]}"
                    >
                        Clear
                    </button>
                </div>
              </div>

</div>`;

});

state.counter.forEach((item)=>{
    document.getElementById(item.identity[0]).addEventListener('click',()=>{
    store.dispatch(changeTheValue(INCREMENT,{value:item.input.value,id:item.id }))
  });


      document.getElementById(item.identity[1]).addEventListener('click',()=>{
      store.dispatch(changeTheValue(DECREMENT,{value:item.input.value, id:item.id}))
    });

    document.getElementById(item.identity[2]).addEventListener('click',()=>{
      store.dispatch(changeTheValue(CLEAR,{value:0,id:item.id}));
    });
   
    document.getElementById(item.input.id).onblur=function(){
       if(this.value){
         item.input.value=+this.value;
       }
      
    }

})

}
//first rendering
render();

addCounter.addEventListener('click',()=>{
store.dispatch(changeUi(ADD))
});
reset.addEventListener('click',()=>{
store.dispatch(changeUi(RESET))
})
//subscribing the ui
store.subscribe(render);


