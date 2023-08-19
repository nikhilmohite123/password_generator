

const password=document.querySelector('.password');
const copybtn=document.querySelector('.copy-btn');
const passLen=document.querySelector('.pass-len');
const slider=document.querySelector('.range-slider');
const checkboxes=document.querySelectorAll('[type=checkbox]');
const uppercase=document.querySelector('#uppercase');
const lowercase=document.querySelector('#lowercase');
const number=document.querySelector('#number');
const symbol=document.querySelector('#symbol');
const indicator=document.querySelector('.strength-indicator');
const generatePass=document.querySelector('.btn');
const copyMsg=document.querySelector('.copyMsg');

let length=10;
let checkNo=0;
const symbolArray="`~!@#$%^&*()-_=+{[}]\|;:'/?<>,.*"
function generateInt(min,max){
    return Math.floor(Math.random()*(max-min))+min;
}

function generateNum(){
    return generateInt(0,9);
}
function generateUppercase(){
    let val=generateInt(65,90);
    return String.fromCharCode(val);
}

function generateLowercase(){
    let val=generateInt(97,122);
    return String.fromCharCode(val);
}

function generateSymbol(){
    let val=generateInt(0,31);
    return symbolArray[val];
}

function rangeslider(){
 length=slider.value;
 passLen.textContent=length;
 let min=slider.min;
 let max=slider.max;
 let val=(length/max)*100;
//  slider.style.backgroundSize= `0% ${(length/max)*100}%`

slider.style.backgroundSize=`${val}% 100%`;
    
}

function suffPassWord(array){
  for(let i=array.length-1; i>=0; i--){
  let j=Math.floor(Math.random()*array.length);
  let temp=array[i];
  array[i]=array[j];
  array[j]=temp;
  }

  let val='';
  array.forEach(element => {
    val+=element;
  });

  return val;
}

function setIndicator(color){
    indicator.style.backgroundColor = color;
    indicator.style.boxShadow= `0 0 10px 1px ${color}`
}

function strength(){
    if((length>4 && checkNo>3) || (length>15 && checkNo>=3) ){
        setIndicator('green');
    }
    else if((length<4 && checkNo<=2) || (checkNo==1)|| (length>10 && checkNo<=2)){
        setIndicator('red');
    }
    else{
        setIndicator('yellow');
    }
}

function noChecked(){
    checkNo=0;
   for(let i=0; i<4; i++){
    if(checkboxes[i].checked){
        checkNo++;
    }
   }
}

checkboxes.forEach((i)=>{
    i.addEventListener('change',noChecked);
})

async function copied(){
 try{
    await  navigator.clipboard.writeText(password.value);
    copyMsg.innerText="copied";
    copyMsg.classList.add('active');
 }
 catch(e){
    copyMsg.innerText="failed";
 }
 

 setTimeout(() => {
    copyMsg.classList.remove('active');
    copyMsg.innerText = '';
 }, 2000);
}

copybtn.addEventListener('click',()=>{
    if(password.value)
    copied();
});
 slider.addEventListener('input',rangeslider);

generatePass.addEventListener('click',()=>{
let val=''
   const array=[];
if(uppercase.checked){
    array.push(generateUppercase);
    val+=generateUppercase();
}
if(lowercase.checked){
    array.push(generateLowercase);
    val+=generateLowercase();
}
if(number.checked){
    array.push(generateNum);
    val+=generateNum();
}
if(symbol.checked){
    array.push(generateSymbol);
    val+=generateSymbol();
}

rangeslider();
   if(length<checkNo){
    length=checkNo;
    slider.value=length;
   } 

   rangeslider();


   for(let i=0; i<length-array.length; i++){
    let no=generateInt(0,array.length);
   val+=array[no]();
     
   }
 strength();
   password.value=suffPassWord(Array.from(val));

})


