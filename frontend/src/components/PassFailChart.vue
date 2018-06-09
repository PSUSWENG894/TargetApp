<script>
import {Doughnut, mixins} from 'vue-chartjs'

export default {
    extends: Doughnut,
    mixins: [mixins.reactiveProp],
    props:{
        failCount: Number,
        passCount: Number,
        'chartData': Object
    },
    mounted () {
        this.renderChart({
        labels: ['Pass', 'Fail'],
        datasets: [
            {
            backgroundColor: [
                '#00D8FF',
                '#DD1B16'
            ],
            data: [this.passCount, this.failCount]
            }
        ]
        }, {responsive: true, maintainAspectRatio: false})
    }
};
</script>