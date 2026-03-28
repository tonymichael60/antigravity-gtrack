document.addEventListener('DOMContentLoaded', () => {
  // Toast Notification System
  function showToast(message) {
    const existing = document.querySelector('.toast');
    if (existing) existing.remove();
    
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    document.body.appendChild(toast);
    
    // Trigger animation
    requestAnimationFrame(() => {
      toast.classList.add('show');
    });
    
    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => toast.remove(), 300);
    }, 2500);
  }

  // Visual Ripple / Scale Down Effect on Click
  document.querySelectorAll('button, .select-dropdown, .dropdown-pill, .card, .cal-day').forEach(el => {
    el.addEventListener('mousedown', () => el.style.transform = 'scale(0.97)');
    el.addEventListener('mouseup', () => el.style.transform = '');
    el.addEventListener('mouseleave', () => el.style.transform = '');
  });

  // Highlight days in calendar on click
  const calendarDays = document.querySelectorAll('.cal-day');
  calendarDays.forEach((day) => {
    day.addEventListener('click', (e) => {
      e.stopPropagation();
      calendarDays.forEach(d => d.classList.remove('active-cal'));
      day.classList.add('active-cal');
      showToast(`Selected calendar day: ${day.querySelector('.cal-date').textContent}`);
    });
  });

  // Assign specific toast messages to Interactive Elements
  const bindings = [
    { selector: '.ph-gear', message: 'Opened System Settings' },
    { selector: '.ph-bell', message: 'You have 3 new alerts' },
    { selector: '.ph-sliders', message: 'Opened Widget Configuration' },
    { selector: '.user-info', message: 'Viewing Alesha\'s Manager Profile' },
    { selector: '.select-dropdown', message: 'Loading available reports list...' },
    { selector: '.ph-paper-plane-tilt', message: 'G-TRACK dashboard report sent successfully!' },
    { selector: '.pill-btn', message: 'Opening new feature task modal...' },
    { selector: '.dropdown-pill', message: 'Selecting active month...' },
    { selector: '.widget-date', message: 'Opening full calendar schedule...' },
    { selector: '.widget-total-time', message: 'Viewing detailed timesheets (645h total)...' },
    { selector: '.widget-efficiency', message: 'Loading graphical efficiency breakdown...' },
    { selector: '.widget-ai', message: 'Initializing AI Smart Assistant sequence...' }
  ];

  // Navigate to Real-Time Monitoring on G-TRACK Title Area click
  const projectInfo = document.querySelector('.project-info');
  if (projectInfo) {
    projectInfo.style.cursor = 'pointer';
    projectInfo.title = 'Click to open real-time monitoring';
    projectInfo.addEventListener('click', (e) => {
      e.stopPropagation();
      // Added a brief UI feedback showing transition
      projectInfo.style.opacity = '0.5';
      showToast('Loading Real-Time Monitoring Dashboard...');
      setTimeout(() => {
        projectInfo.style.opacity = '1';
        window.open('monitoring.html', '_blank');
      }, 500);
    });
  }

  bindings.forEach(binding => {
    const elements = document.querySelectorAll(binding.selector);
    elements.forEach(el => {
      // Find the closest clickable parent if necessary
      const target = el.closest('button, .card, .select-dropdown, .dropdown-pill') || el;
      target.addEventListener('click', (e) => {
        e.stopPropagation();
        showToast(binding.message);
      });
    });
  });

  // Fallback for clicking cards themselves
  document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('click', () => {
      // If the card wasn't intercepted by a specific binding button
      showToast('Exploring dashboard widget...');
    });
  });

  // Real-time Gas Weight Monitoring Simulation
  const gasWeightValue = document.getElementById('gas-weight-value');
  const gasWeightFill = document.getElementById('gas-weight-fill');
  
  if (gasWeightValue && gasWeightFill) {
    let currentWeight = 139.0;
    const maxCapacity = 200; // in kg
    
    // Update every 2 seconds
    setInterval(() => {
      const change = (Math.random() * 2) - 0.8;
      currentWeight = Math.max(0, Math.min(maxCapacity, currentWeight + change));
      
      gasWeightValue.textContent = `${currentWeight.toFixed(1)} kg`;
      gasWeightFill.style.width = `${(currentWeight / maxCapacity) * 100}%`;
      
      if (currentWeight > maxCapacity * 0.8) {
        gasWeightFill.style.backgroundColor = '#ff3a3a'; 
      } else {
        gasWeightFill.style.backgroundColor = 'var(--black)'; 
      }
    }, 2000);
  }
});
