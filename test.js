const randomIndex = (arrLen)=>{
  const index = Math.random() % arrLen;
}

const randomSort = (arr) => {
  const ans = new Array(arr.length).fill(0);
  // const map = new Map();
  for(let i=0;i<arr.length;i++){
    
    let Index = randomIndex(arr.length);
    while(ans[Index]){
      Index = randomIndex(arr.length);
    }
    ans[Index] = arr[i];
  }
  console.log(ans);
}

const arr = [1,2,3,4,5,6,7,8,9];
randomSort(arr);