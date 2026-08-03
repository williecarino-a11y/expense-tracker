document.addEventListener('DOMContentLoaded', () => {
    let currentStep = 1;
    const totalSteps = 4;
    const formData = {
        liquidityFlow: '',
        capitalAllocation: '',
        strategicObjective: '',
        disciplineStyle: ''
    };

    const questionsData = {
        1: {
            title: "How would you rate your current liquidity flow?",
            options: [
                { id: 'critical', label: '🔴 Critical: Blind spots everywhere, bleeding capital.' },
                { id: 'neutral', label: '🟡 Neutral: Stable cash flow, but lacking optimization.' },
                { id: 'optimized', label: '🟢 Optimized: Automated growth, ready to scale investments.' }
            ],
            key: 'liquidityFlow'
        },
        2: {
            title: "Where does your primary capital deploy?",
            options: [
                { id: 'personal', label: '👤 Personal Infrastructure (Lifestyle, tech, self-dev)' },
                { id: 'shared', label: '🤝 Shared Assets (Partner, family, dependents)' },
                { id: 'venture', label: '🌐 Venture & Scale (Side hustles, external projects)' }
            ],
            key: 'capitalAllocation'
        },
        3: {
            title: "What is your primary financial milestone for this cycle?",
            options: [
                { id: 'mitigation', label: '🛡️ Risk Mitigation (Building a robust liquidity buffer)' },
                { id: 'expansion', label: '📈 Portfolio Expansion (Aggressive investing and compounding)' },
                { id: 'acquisition', label: '🛫 Asset Acquisition (Real estate, major mobility, or global travel)' }
            ],
            key: 'strategicObjective'
        },
        4: {
            title: "How do you manage expense logging discipline?",
            options: [
                { id: 'realtime', label: '⚡ Real-time sync master' },
                { id: 'weekly', label: '🗓️ Weekly audit habitué' },
                { id: 'alerts', label: '🆘 Needs automated transaction alerts' }
            ],
            key: 'disciplineStyle'
        }
    };

    const appContainer = document.getElementById('app');

    function renderStep() {
        if (currentStep > totalSteps) {
            submitOnboardingData();
            return;
        }

        const stepData = questionsData[currentStep];
        const progressPercentage = (currentStep / totalSteps) * 100;

        appContainer.innerHTML = `
            <div class="onboarding-container">
                <div>
                    <div class="progress-track">
                        <div class="progress-fill" style="width: ${progressPercentage}%;"></div>
                    </div>
                    <h2>${stepData.title}</h2>
                    <div class="option-group">
                        ${stepData.options.map(opt => `
                            <button class="option-card" data-id="${opt.id}" data-key="${stepData.key}">
                                ${opt.label}
                            </button>
                        `).join('')}
                    </div>
                </div>
            </div>
        `;

        // Attach event listeners to options
        document.querySelectorAll('.option-card').forEach(button => {
            button.addEventListener('click', (e) => {
                const key = e.currentTarget.getAttribute('data-key');
                const value = e.currentTarget.getAttribute('data-id');
                formData[key] = value;
                currentStep++;
                renderStep();
            });
        });
    }

    async function submitOnboardingData() {
        appContainer.innerHTML = `
            <div class="onboarding-container" style="text-align: center; justify-content: center; height: 80vh;">
                <h2>Initializing Global Account...</h2>
                <p style="color: #94a3b8;">Configuring your secure multi-currency environment.</p>
            </div>
        `;

        try {
            const response = await fetch('/auth/initialize', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email: "developer@xylotix.io", // Can be dynamically mapped later from your auth screen
                    authProvider: "github",
                    onboardingProfile: formData
                })
            });

            const result = await response.json();
            if (result.success) {
                window.location.href = '/dashboard.html'; // Redirect to main app layout
            } else {
                alert('Initialization error: ' + result.error);
            }
        } catch (err) {
            console.error('Network error:', err);
            appContainer.innerHTML = `<div class="onboarding-container"><h2>Setup Complete! Redirecting...</h2></div>`;
            setTimeout(() => { window.location.href = '/index.html'; }, 1500);
        }
    }

    renderStep();
});
