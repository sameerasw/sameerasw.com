document.addEventListener('DOMContentLoaded', ()=>{
  document.querySelectorAll('.contact-widget').forEach(widget=>{
    const buttons = Array.from(widget.querySelectorAll('.cw-btn'));
    const setMode = (mode)=>{
      widget.classList.remove('cw-mode-all','cw-mode-domain','cw-mode-handle','cw-mode-local');
      widget.classList.add('cw-mode-'+mode);
    };

    // default selected button (first) should already have .cw-selected in markup
    const selected = widget.querySelector('.cw-btn.cw-selected');
    setMode(selected ? selected.dataset.target : 'all');

    // only attach mouse hover listeners on devices that support hover
    const hasHover = window.matchMedia && window.matchMedia('(hover: hover) and (pointer: fine)').matches;

    // we'll temporarily remove the pinned (selected) button while hovering/focusing
    let _prevPinned = null;

    buttons.forEach(btn=>{
      const target = btn.dataset.target || 'all';

      const makeActiveTemporarily = ()=>{
        // store currently pinned button (if different) and unpin it visually
        const pinned = widget.querySelector('.cw-btn.cw-selected');
        if(pinned && pinned !== btn){
          _prevPinned = pinned;
          pinned.classList.remove('cw-selected');
          // keep aria-selected accurate while temporarily unpinned
          pinned.setAttribute('aria-selected', 'false');
        } else {
          _prevPinned = null;
        }
        // ensure only this button shows active state
        buttons.forEach(b=>b.classList.remove('cw-active'));
        btn.classList.add('cw-active');
      };

      const restorePinned = ()=>{
        // remove temporary active state
        btn.classList.remove('cw-active');
        // restore previously pinned button's visual state
        if(_prevPinned){
          _prevPinned.classList.add('cw-selected');
          _prevPinned.setAttribute('aria-selected', 'true');
          _prevPinned = null;
        }
      };

      if(hasHover){
        btn.addEventListener('mouseenter', ()=>{
          makeActiveTemporarily();
          setMode(target);
        });

        btn.addEventListener('mouseleave', ()=>{
          restorePinned();
          // revert to selected
          const sel = widget.querySelector('.cw-btn.cw-selected');
          setMode(sel ? sel.dataset.target : 'all');
        });
      }

      // keyboard support (always) - behave like hover: temporarily show active
      btn.addEventListener('focus', ()=>{
        makeActiveTemporarily();
        setMode(target);
      });
      btn.addEventListener('blur', ()=>{
        restorePinned();
        const sel = widget.querySelector('.cw-btn.cw-selected');
        setMode(sel ? sel.dataset.target : 'all');
      });

      // click toggles the selected state so it can be 'pinned' (works on mobile)
      btn.addEventListener('click', (e)=>{
        // ensure click still functions on touch devices
        e.preventDefault && e.preventDefault();
        buttons.forEach(b=>b.classList.remove('cw-selected'));
        btn.classList.add('cw-selected');
        // update aria-selected
        buttons.forEach(b=>b.setAttribute('aria-selected', b.classList.contains('cw-selected')));
        // clear any temporary state
        buttons.forEach(b=>b.classList.remove('cw-active'));
        _prevPinned = null;
        setMode(target);
      });
    });
  });
});
