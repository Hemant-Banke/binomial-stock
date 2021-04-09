// Sidebar Toggle
(function(){
    var sidebar_toggle = document.getElementById('sidebar_toggle');

    sidebar_toggle.addEventListener('click', function(){
        let wrapper = document.getElementById('wrapper');
        let toggle_state = wrapper.getAttribute('data-toggle');

        if (toggle_state == 'open'){
            wrapper.className = 'wrapper closed';
            wrapper.setAttribute('data-toggle', 'close');
            sidebar_toggle.querySelector('.material-icons').innerText = 'chevron_right';
        }
        else{
            wrapper.className = 'wrapper opened';
            wrapper.setAttribute('data-toggle', 'open');
            sidebar_toggle.querySelector('.material-icons').innerText = 'chevron_left';
        }
    });

    // Close if width < 768px
    if (window.screen.width < 768){
        wrapper.className = 'wrapper closed';
        wrapper.setAttribute('data-toggle', 'close');
        sidebar_toggle.querySelector('.material-icons').innerText = 'chevron_right';
    }
})();

window.addEventListener('load', function(){
    let spinner = document.getElementById('data_spinner');
    const num_steps = parseInt(document.getElementById('input_steps').value);

    function generateData(num_labels){
        const input_s0 = parseFloat(document.getElementById('input_s0').value);
        const input_u = parseFloat(document.getElementById('input_u').value);
        const input_d = parseFloat(document.getElementById('input_d').value);
        const input_p = parseFloat(document.getElementById('input_p').value);

        document.getElementById('control_s0').innerText = input_s0;
        document.getElementById('control_u').innerText = input_u;
        document.getElementById('control_d').innerText = input_d;
        document.getElementById('control_p').innerText = input_p;
        document.getElementById('control_steps').innerText = num_labels;

        var dataset = [];
        for (let i = 0; i < num_labels; i++){
            let new_price = 0;
            if (i == 0){
                new_price = input_s0;
            }
            else{
                let p = Math.random();
                if (p < input_p){
                    new_price = dataset[i-1]*(1 + (input_u)/100);
                }
                else{
                    new_price = dataset[i-1]*(1 - (input_d)/100);
                }
            }

            dataset[i] = new_price;
        }

        return dataset;
    }


    // Handle Chart
    var ctx = document.getElementById('stock_chart').getContext('2d');

    const data = {
        labels: Array.from({length: num_steps}, (_, i) => i + 1),
        datasets: [{
            label: 'Price',
            data: generateData(num_steps),
            fill: false,
            borderColor: 'rgb(75, 192, 192)',
            borderWidth: 1,
            tension: 0.1
        }]
    };

    var stock_chart = new Chart(ctx, {
        type: 'line',
        data: data,
        options: {
            elements: {
                point:{
                    radius: 0
                }
            }
        }
    });


    function updateChart(num_labels){
        stock_chart.data.labels = Array.from({length: num_labels}, (_, i) => i + 1);
        stock_chart.data.datasets[0].data = generateData(num_labels);
        stock_chart.update();
    }

    document.getElementById('control_form').addEventListener('submit', function(e){
        e.preventDefault();
        e.stopPropagation();

        spinner.style.display = 'inline-block';

        const num_labels = parseInt(document.getElementById('input_steps').value);
        updateChart(num_labels);
        spinner.style.display = 'none';

        // Close if width < 768px
        if (window.screen.width < 768){
            wrapper.className = 'wrapper closed';
            wrapper.setAttribute('data-toggle', 'close');
            sidebar_toggle.querySelector('.material-icons').innerText = 'chevron_right';
        }
    });
});