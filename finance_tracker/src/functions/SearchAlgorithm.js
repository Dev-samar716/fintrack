export function Search(query,setCounter, counter,setQueryResults,Expense_Data) {
    let tokenized_query = query.split(' ');
    let RelevantExpenses_Arr = [];
    
    for(let i = 0; i < Expense_Data.length; i++) {
         let j = 0;
         let k = 0;
         let score = 0
         let Expense_title = Expense_Data[i].Expense_Title.split(' ');
         
        while(j < Expense_title.length && k < tokenized_query.length) {
if(Expense_title[j].toLowerCase().replace(/\s+/g, "") === tokenized_query[k].toLowerCase().replace(/\s+/g, "")) {
    score++;
    j++;
    k++;
} else {
    score += 0;
    if(Expense_title.length > tokenized_query.length) {
      j++;
    } else if(Expense_title.length < tokenized_query.length) {
        k++;
    } else {
        j++;
    }
} 
        }
        if (score > 0) {
            // Push once per expense
            const expenseCopy = { ...Expense_Data[i] };
            delete expenseCopy.id; // optional if you want a new id
            RelevantExpenses_Arr.push({
                ...expenseCopy,
                Score: score,
                id: Math.floor(Math.random() * 1_0000_000_000_000) + 1
            });
        }
    } 
    console.log(RelevantExpenses_Arr);
    setCounter(counter + 1);
    setQueryResults(RelevantExpenses_Arr);
}