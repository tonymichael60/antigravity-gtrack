document.addEventListener('DOMContentLoaded', () => {
  // Toast Notification System
  function showToast(message) {
    const existing = document.querySelector('.toast');
    if (existing) existing.remove();
    
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    document.body.appendChild(toast);
    
    requestAnimationFrame(() => toast.classList.add('show'));
    
    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => toast.remove(), 300);
    }, 2500);
  }

  // Visual Ripple / Scale Down Effect on Click
  document.querySelectorAll('button, .select-dropdown, .dropdown-pill, .card, .act-bar').forEach(el => {
    el.addEventListener('mousedown', () => el.style.transform = 'scale(0.97)');
    el.addEventListener('mouseup', () => el.style.transform = '');
    el.addEventListener('mouseleave', () => el.style.transform = '');
  });

  // Highlight Activity days on click
  const activityCols = document.querySelectorAll('.activity-col');
  activityCols.forEach((col) => {
    col.addEventListener('click', (e) => {
      e.stopPropagation();
      activityCols.forEach(c => c.classList.remove('active-col'));
      col.classList.add('active-col');
      
      // Toggle badges
      activityCols.forEach(c => {
         const badge = c.querySelector('.act-badge');
         if(badge && !c.classList.contains('active-col')) badge.remove();
      });
      
      if (!col.querySelector('.act-badge')) {
         const badge = document.createElement('div');
         badge.className = 'act-badge label-badge';
         badge.textContent = Math.floor(Math.random() * 30 + 10);
         col.insertBefore(badge, col.firstChild);
      }
      showToast(`Viewing activity for ${col.querySelector('.act-day').textContent}`);
    });
  });

  // Assign specific toast messages to Interactive Elements
  const bindings = [
    { selector: '.dropdown-pill', message: 'Opening QA Team dropdown...' },
    { selector: '.ph-wallet', message: 'Entering budget manager...' },
    { selector: '.ph-dots-three', message: 'Opening additional options...' },
    { selector: '.vert-bar-col', message: 'Viewing specific performance details...' },
  ];

  bindings.forEach(binding => {
    const elements = document.querySelectorAll(binding.selector);
    elements.forEach(el => {
      const target = el.closest('button, .card, .dropdown-pill, .vert-bar-col') || el;
      target.addEventListener('click', (e) => {
        e.stopPropagation();
        showToast(binding.message);
      });
    });
  });

  // Real-time Arc Gauge Monitoring Simulation
  const gasWeightValue = document.getElementById('gas-weight-value2');
  const gasWeightFill = document.getElementById('gauge-fill2');
  const gaugePointer = document.getElementById('gauge-pointer');
  
  if (gasWeightValue && gasWeightFill && gaugePointer) {
    let currentWeight = 139.0;
    const maxCapacity = 200; // in kg
    const pathLength = 251.3;
    
    // Initial Setup
    gasWeightFill.style.strokeDasharray = pathLength;
    gaugePointer.style.transition = 'transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)';
    
    setInterval(() => {
      const change = (Math.random() * 4) - 2.0; 
      currentWeight = Math.max(0, Math.min(maxCapacity, currentWeight + change));
      
      gasWeightValue.textContent = `${currentWeight.toFixed(1)} kg`;
      
      // Calculate offset (100% full = offset 0)
      const percentage = currentWeight / maxCapacity;
      const offset = pathLength * (1 - percentage);
      gasWeightFill.style.strokeDashoffset = offset;
      
      // Calculate precise angle aiming at the exact rounded linecap tip
      const angle = percentage * Math.PI;
      // 80 is the arc radius, exact path tip coordinates
      const x_tip = 100 - 80 * Math.cos(angle);
      const y_tip = 110 - 80 * Math.sin(angle);
      // add 10px tangent vector for the stroke-linecap="round" (stroke-width: 20)
      const x_cap = x_tip + 10 * Math.sin(angle);
      const y_cap = y_tip - 10 * Math.cos(angle);
      // Delta from the pointer's fixed anchor origin (X=100, Y=85)
      const dx = x_cap - 100;
      const dy = y_cap - 85;
      // Base polygon arrow points left (-1, 0) which is 180 deg
      const rotation = (Math.atan2(dy, dx) * 180 / Math.PI) - 180;
      
      gaugePointer.style.transformOrigin = '0px 0px';
      gaugePointer.style.transform = `rotate(${rotation}deg)`;
      
      // Color logic warning
      if (percentage > 0.85) {
        gasWeightFill.style.stroke = '#ff3a3a'; 
        gasWeightValue.style.color = '#ff3a3a';
      } else {
        gasWeightFill.style.stroke = 'var(--black)'; 
        gasWeightValue.style.color = 'var(--black)';
      }
    }, 2000);
  }
});
