document.addEventListener('DOMContentLoaded', () => {
    // Accordion behaviour: unobtrusive, accessible toggle
    const accordions = document.querySelectorAll('.accordion');
    accordions.forEach((acc, idx) => {
        const panel = acc.nextElementSibling;
        acc.setAttribute('aria-expanded', 'false');
        // ensure panels have ids for aria-controls
        if (panel && !panel.id) panel.id = `panel-${idx}`;
        if (panel) acc.setAttribute('aria-controls', panel.id);

        const toggle = () => {
            const isActive = acc.classList.toggle('active');
            acc.setAttribute('aria-expanded', String(isActive));
            if (!panel) return;
            if (isActive) {
                panel.style.maxHeight = panel.scrollHeight + 'px';
                panel.style.paddingTop = '0.75rem';
                panel.style.paddingBottom = '0.75rem';
            } else {
                panel.style.maxHeight = null;
                panel.style.paddingTop = '';
                panel.style.paddingBottom = '';
            }
        };

        acc.addEventListener('click', toggle);
        // keyboard activation: Enter and Space
        acc.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggle();
            }
        });
    });

    // Image click: show a small accessible dialog instead of a blocking alert
    const imageNode = document.getElementById('image');
    if (imageNode) {
        imageNode.style.cursor = 'pointer';
        imageNode.addEventListener('click', () => {
            const modal = document.createElement('div');
            modal.className = 'gd-modal';
            modal.innerHTML = `
                <div class="gd-modal-backdrop" tabindex="-1" style="position:fixed;inset:0;background:rgba(0,0,0,.5);display:flex;align-items:center;justify-content:center;z-index:2000;">
                    <div role="dialog" aria-modal="true" style="background:#fff;color:#000;padding:1rem;border-radius:6px;max-width:480px;width:90%;box-shadow:0 6px 24px rgba(0,0,0,.3);">
                        <button class="gd-modal-close" aria-label="Close" style="float:right;border:none;background:transparent;font-size:1.25rem;cursor:pointer;">&times;</button>
                        <h2 style="margin-top:0">Michigun</h2>
                        <p>Rest in Peace Michigun December 9, 1996 – March 2021 ΔΔΔ</p>
                    </div>
                </div>
            `;
            document.body.appendChild(modal);
            const close = modal.querySelector('.gd-modal-close');
            const backdrop = modal.querySelector('.gd-modal-backdrop');
            const cleanup = () => { if (modal.parentNode) modal.parentNode.removeChild(modal); imageNode.focus(); };
            close.addEventListener('click', cleanup);
            backdrop.addEventListener('click', (e) => { if (e.target === backdrop) cleanup(); });
            const escHandler = (e) => { if (e.key === 'Escape') { cleanup(); document.removeEventListener('keydown', escHandler); } };
            document.addEventListener('keydown', escHandler);
            close.focus();
        });
    }
});
