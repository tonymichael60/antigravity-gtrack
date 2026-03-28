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

  // Interactive Elements handling
  document.querySelectorAll('.circle-btn, .pill-btn, .nav-item, .user-profile').forEach(el => {
    el.addEventListener('click', (e) => {
      // Don't toast if it's a real link that might navigate away, unless it's just "#"
      if (el.tagName.toLowerCase() === 'a' && el.getAttribute('href') !== '#') {
        return;
      }
      e.preventDefault();
      
      let msg = "Action triggered";
      if(el.classList.contains('nav-item')) msg = "Navigating to " + el.textContent.trim();
      else if(el.querySelector('.ph-bell')) msg = "Opening Notifications Panel";
      else if(el.querySelector('.ph-question')) msg = "Opening Help & Support";
      else if(el.classList.contains('user-profile')) msg = "Opening Profile Settings";
      else if(el.textContent.includes('Modify')) msg = "Opening Threshold Settings Modal";
      else if(el.textContent.includes('Audit Log')) msg = "Loading Full System Audit Log...";
      
      showToast(msg);
    });
  });

  // Real-time Arc Gauge Monitoring Simulation
  const gasWeightValue = document.getElementById('gas-weight-value-live');
  const gasWeightFill = document.getElementById('gauge-fill-live');
  const gaugePointer = document.getElementById('gauge-pointer-live');
  const gasPercent = document.getElementById('gas-percent');
  
  if (gasWeightValue && gasWeightFill && gaugePointer && gasPercent) {
    let currentWeight = 138.7;
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
      const displayPercent = Math.round(percentage * 100);
      gasPercent.textContent = `${displayPercent}%`;
      
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
        gasPercent.style.color = '#ff3a3a';
      } else if (percentage < 0.15) {
        gasWeightFill.style.stroke = '#ff4d00'; 
        gasWeightValue.style.color = '#ff4d00';
        gasPercent.style.color = '#ff4d00';
      } else {
        gasWeightFill.style.stroke = 'var(--black)'; 
        gasWeightValue.style.color = 'var(--black)';
        gasPercent.style.color = 'var(--black)';
      }
    }, 2000);
  }
});
