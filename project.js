// npm init (create a package.js file)
// nmp i prompt-sync(for user inputs)
// 1.Deposite the money
// 2.Determine number of lines that you are going to bed
// 3.colloect the bed amount
// 4.spin the slot machine
// 5.check if the user won
// 6.Give their the user winnigs
//7.play again 
//A java scrpit function
/*function deposit()
{
    return 1;
}*/
//Take user input using prompt-sync




//--------------------------1.Deposite the money--------------------------------------
const prompt = require("prompt-sync")();

const ROWS = 3;
const COLS = 3;

const SYMOBOL_COUNT=
{
   A:2,
   B:4,
   C:6,
   D:8
}
// multiply the bet by this values
const SYMOBOL_VALUES=
{
    A:5,
    B:4,
    C:3,
    D:2
}

const deposit = () =>
{ 
    // the code run until user enter a valid deposit amount
    while(true){
   const depositAmount = prompt("Enter a deposit amount: ");
   // convert string to floating point number
   const numberDepositAmount = parseFloat(depositAmount);
   // check the input number is valid or not using isNan() function
   if(isNaN(numberDepositAmount)||numberDepositAmount<=0)
   {
    console.log("invalid deposit amount,try again");
   }
   else{
    return numberDepositAmount;
   }
  }
}
//const depositAmount = deposit();
//console.log(depositAmount);

//2.------------------------------------- 2.Determine number of lines that you are going to bed----------------------------
const getnumberOfLines=()=>
{
    while(true){
    const lines = prompt("Enter the number of lines bet on (1-3):");
    const linesnumber = parseFloat(lines);
    if(isNaN(linesnumber)||linesnumber<1||linesnumber>3)
    {
        console.log("invalid line number,try again");
    }
    else{
        return linesnumber;
    }
   }

}
// let to change the amount ,using constant we cannot change the amount


//3.---------------------Collect the bed amount----------------------------
//BET A AMOUNT PER EACH LINE  (but bet per line > blance/no of lines)
const getBet=(balance,lines)=>
{
    while(true){
    const bet = prompt("Enter the bet per line:");
    const noBet = parseFloat(bet);
    if(isNaN(noBet)||noBet<=0||noBet>balance/lines)
    {
        console.log("Invalid bet,try again....");
    }
    else{
        return noBet;
    }
  }
}

//-----------------------------4.spin the slot machine---------------------------------
//Random selection from the spin slot machine
const spin = () =>
{
   // put array contain all of the possible symbols
   const symbols =[];
   for(const[symbol,count] of Object.entries(SYMOBOL_COUNT))
   {
     //console.log(symbol,count);
     //push the symbols and values to the array
     for(let i=0;i<count;i++)
     {
        symbols.push(symbol);
     }
   }
   //console.log(symbols);
   //use nested array 
   //each inside arrays is going to reprsents a coloumn inside our slot machine
   const reels =[];
   for(let i=0;i<COLS;i++)
   {
     reels.push([]);
     //we need to randomly select element from our symbols
     // need to remove extra symbols in random selecting
     const reelSysmbols =[...symbols];
     
     for(let j=0;j<ROWS;j++)
     {
           const randomIndex = Math.floor(Math.random()*reelSysmbols.length);
           const selectedSymbol = reelSysmbols[randomIndex];
           reels[i].push(selectedSymbol);
           reelSysmbols.splice(randomIndex,1);

     }
    
   }
   return reels;
}
//--------------------------Transpose the matrix----------------------------------
const transpose =(reels)=>
{
  const rows=[];
  for(let i=0;i<ROWS;i++)
  {
    rows.push([]);
    for (let j = 0;j<COLS;j++)
    {
        rows[i].push(reels[j][i]);
    }
  }
    return rows;
}
//--------print the row----------
 const printRows=(rows)=>
 {
    for(const row of rows)
    {
        let rowString ="";
        for(const[i,symbol] of row.entries())
        {
            rowString += symbol;
            if( i!= row.length-1)
            {
                rowString += " | ";
            }
        }
        console.log(rowString);
    }
 }
// ------------get winnings ------------------
 const getWinnings=(rows,bet,lines) =>
 {
    let winnings =0;
    for(let row =0; row<lines;row++)
    {
        const symbols = rows[row];
        let allsame = true;
        for(const symbol of symbols)
        {
            if(symbol != symbols[0])
            {
                allsame = false;
                break;
            }
        }
        if (allsame)
        {
            winnings += bet*SYMOBOL_VALUES[symbols[0]];
        }
    }
    return winnings;

 }
 const game =()=>{
  let balance = deposit();
 
    while(true){
console.log("You have a balance of $"+balance);   
const numberofLines = getnumberOfLines();
const bet = getBet(balance,numberofLines);

balance -= bet*numberofLines;
const reels = spin();
const rows = transpose(reels) 
printRows(rows);
//console.log(reels);
//console.log(rows);
const winnigs = getWinnings(rows,bet,numberofLines);
balance += winnigs;
console.log("You won,$"+winnigs.toString());

if(balance<=0)
{
    console.log("You ran out of money!");
    break;
}
const playAgain = prompt("Do you want play agian(y/n)?");
if(playAgain != "y") break;

    }
};

 game();



