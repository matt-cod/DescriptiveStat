class DescriptiveStatistics {
    constructor(data) {
        this.data = data;
    }

    // Measures of Central Tendency

    mean() {
        const sum = this.data.reduce((acc, val) => acc + val, 0);
        return sum / this.data.length;
    }

    median() {
        const sortedData = this.data.slice().sort((a, b) => a - b);
        const mid = Math.floor(sortedData.length / 2);

        if (sortedData.length % 2 === 0) {
            return (sortedData[mid - 1] + sortedData[mid]) / 2;
        } else {
            return sortedData[mid];
        }
    }

    mode() {
        const counts = {};
        this.data.forEach(num => {
            counts[num] = (counts[num] || 0) + 1;
        });

        let maxCount = 0;
        let modes = [];
        for (const num in counts) {
            const count = counts[num];
            if (count > maxCount) {
                maxCount = count;
                modes = [num];
            } else if (count === maxCount) {
                modes.push(num);
            }
        }
        return modes;
    }

    // Measures of Dispersion

    range() {
        const sortedData = this.data.slice().sort((a, b) => a - b);
        return sortedData[sortedData.length - 1] - sortedData[0];
    }

    variance() {
        const mean = this.mean();
        const squaredDiffs = this.data.map(num => (num - mean) ** 2);
        return squaredDiffs.reduce((acc, val) => acc + val, 0) / this.data.length;
    }

    standardDeviation() {
        return Math.sqrt(this.variance());
    }

    meanDeviation() {
        const mean = this.mean();
        const deviations = this.data.map(num => Math.abs(num - mean));
        return deviations.reduce((acc, val) => acc + val, 0) / this.data.length;
    }

    quartileDeviation() {
        const sortedData = this.data.slice().sort((a, b) => a - b);
        const lowerQuartile = this.median(sortedData.slice(0, Math.floor(sortedData.length / 2)));
        const upperQuartile = this.median(sortedData.slice(Math.ceil(sortedData.length / 2)));
        return upperQuartile - lowerQuartile;
    }
}

// Example usage:
const data = [4, 5, 6, 7, 8, 8, 9, 10, 10, 11];
const stats = new DescriptiveStatistics(data);

console.log("Mean:", stats.mean());
console.log("Median:", stats.median());
console.log("Mode:", stats.mode());
console.log("Range:", stats.range());
console.log("Variance:", stats.variance());
console.log("Standard Deviation:", stats.standardDeviation());
console.log("Mean Deviation:", stats.meanDeviation());
console.log("Quartile Deviation:", stats.quartileDeviation());
