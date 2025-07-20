export const cartTotal=(items)=>{

   return items.reduce((accumlatore, item)=>item.totalPrice+accumlatore,0)
}
//Initial value 0
//accumulator: Accumulates the result of each iteration.
//item: Each product in the array
//item.totalPrice + accumulator: Adds the current product price (item.totalPrice) 
                    // to the accumulator.
