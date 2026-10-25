// Motion describes UI changes only. It never reads document contents or filenames.
const preference=matchMedia('(prefers-reduced-motion: reduce)');
const ease='cubic-bezier(.16,1,.3,1)';
const active=new Set(),perElement=new WeakMap();
let pointer=false;
document.addEventListener('pointerdown',()=>{pointer=true;document.documentElement.dataset.motionInput='pointer'},{passive:true});
document.addEventListener('keydown',()=>{pointer=false;document.documentElement.dataset.motionInput='keyboard';stop()});
function play(element,frames,{duration=220,delay=0,initial=false}={}) {
  if(!element||preference.matches||document.hidden||(!initial&&!pointer)||!element.animate)return;
  perElement.get(element)?.cancel();
  const animation=element.animate(frames,{duration,delay,easing:ease});
  perElement.set(element,animation);active.add(animation);
  const finish=()=>{active.delete(animation);if(perElement.get(element)===animation)perElement.delete(element)};
  animation.onfinish=finish;animation.oncancel=finish;
}
function stop(){for(const animation of active)animation.cancel();active.clear()}
preference.addEventListener('change',stop);
document.addEventListener('visibilitychange',()=>{if(document.hidden)stop()});

const grid=document.getElementById('core-tools');
const categories=document.querySelector('.browse-categories');
if(grid&&categories) {
  const indicator=document.createElement('span');indicator.className='category-indicator';indicator.setAttribute('aria-hidden','true');categories.append(indicator);
  const positionIndicator=()=>{
    const selected=categories.querySelector('[aria-pressed="true"]');
    if(selected)indicator.style.transform=`translateX(${selected.offsetLeft}px) scaleX(${selected.offsetWidth})`;
  };
  let previous=new Map(),frame;
  document.addEventListener('pdfgirlfriend:catalog-before',()=>{
    if(preference.matches||!pointer){previous.clear();return;}
    previous=new Map([...grid.querySelectorAll('a:not([hidden])')].map(card=>[card,card.getBoundingClientRect()]));
  });
  document.addEventListener('pdfgirlfriend:catalog',()=>{
    positionIndicator();cancelAnimationFrame(frame);
    frame=requestAnimationFrame(()=>{
      if(preference.matches||!pointer){previous.clear();return;}
      for(const card of grid.querySelectorAll('a:not([hidden])')) {
        const next=card.getBoundingClientRect();
        if(next.top>innerHeight||next.bottom<0)continue;
        const before=previous.get(card);
        if(before&&before.bottom>0&&before.top<innerHeight){const x=Math.max(-48,Math.min(48,before.left-next.left)),y=Math.max(-48,Math.min(48,before.top-next.top));if(Math.abs(x)+Math.abs(y)>1)play(card,[{transform:`translate(${x}px,${y}px)`},{transform:'translate(0,0)'}]);}
        else play(card,[{opacity:.55,transform:'translateX(8px)'},{opacity:1,transform:'translateX(0)'}]);
      }
      previous.clear();
    });
  });
  new ResizeObserver(positionIndicator).observe(categories);
  document.fonts?.ready.then(positionIndicator);positionIndicator();
  // One paper-fan introduction in the first viewport; never a scrolling reveal loop.
  let introduced=false;
  const introduce=()=>{
    if(introduced||!grid.children.length)return;
    introduced=true;observer.disconnect();
    requestAnimationFrame(()=>{
      [...grid.querySelectorAll('a')].filter(card=>card.getBoundingClientRect().top<innerHeight).slice(0,5).forEach((card,index)=>{
        const paper=card.querySelector('.document-page'),back=card.querySelector('.secondary-page');
        for(const [element,direction] of [[paper,1],[back,-1]])if(element){const rest=getComputedStyle(element).transform;play(element,[{transform:rest+' rotate('+direction*8+'deg)'},{transform:rest}],{duration:360,delay:index*24,initial:true});}
      });
    });
  };
  const observer=new MutationObserver(introduce);observer.observe(grid,{childList:true});introduce();
}

document.addEventListener('privypdf:tool',()=>requestAnimationFrame(()=>{
  for(const selector of ['.title-row','#options.show'])play(document.querySelector(selector),[{opacity:.65,transform:'translateX(6px)'},{opacity:1,transform:'translateX(0)'}]);
}));
const files=document.getElementById('files');
if(files)new MutationObserver(records=>{
  for(const row of records.flatMap(record=>[...record.addedNodes]).filter(node=>node.nodeType===1&&node.matches('.file')).slice(0,4))play(row,[{opacity:.6,transform:'translateX(8px)'},{opacity:1,transform:'translateX(0)'}]);
}).observe(files,{childList:true});
const result=document.querySelector('.download-result');
if(result)new MutationObserver(()=>{if(!result.hidden)play(result,[{opacity:.6,transform:'translateY(6px)'},{opacity:1,transform:'translateY(0)'}])}).observe(result,{attributes:true,attributeFilter:['hidden']});
else {
  // Result panel can be registered after this small independent module.
  const app=document.querySelector('.workspace');
  if(app){const watch=new MutationObserver(()=>{const panel=app.querySelector('.download-result');if(!panel)return;watch.disconnect();new MutationObserver(()=>{if(!panel.hidden)play(panel,[{opacity:.6,transform:'translateY(6px)'},{opacity:1,transform:'translateY(0)'}])}).observe(panel,{attributes:true,attributeFilter:['hidden']})});watch.observe(app,{childList:true,subtree:true})}
}

window.addEventListener('pageswap',event=>{if(preference.matches||!pointer)event.viewTransition?.skipTransition()});
