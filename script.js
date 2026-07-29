
const scenarios=[
{q:'Tomatoes wilt after two 102°F days then recover.',a:0,opts:['Weather','Climate','Not enough information'],fb:'Weather is short-term.'},
{q:'Lilacs bloom earlier every spring for 10 years.',a:1,opts:['Weather','Climate','Not enough information'],fb:'Long-term patterns indicate climate.'},
{q:'Fruit trees bloom then a late frost damages blossoms.',a:2,opts:['Weather','Climate','Not enough information'],fb:'One season is not enough evidence.'},
{q:'Maria waters more often and hydrangeas scorch for several years.',a:1,opts:['Weather','Climate','Not enough information'],fb:'Repeated observations suggest climate.'},
{q:'What should you do first?',a:2,opts:['Change everything','Assume weather','Observe and record over time'],fb:'Observation is the first step toward adaptation.'}
];
let i=0;const app=document.getElementById('app');
function render(){let s=scenarios[i];app.innerHTML=`<h2>Scenario ${i+1}</h2><p>${s.q}</p>`;s.opts.forEach((o,idx)=>{let b=document.createElement('button');b.textContent=o;b.onclick=()=>{alert((idx===s.a?'✓ ':'✗ ')+s.fb);i++; if(i<scenarios.length)render(); else app.innerHTML='<h2>Finished</h2><p>Climate adaptation begins with careful observation.</p>';};app.appendChild(b);});}
render();
