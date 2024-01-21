
export default function useFormatDate() {
    const formatDate = (date, longFormat) => {
        const options = longFormat ? 
            { weekday: 'short', year: 'numeric', month: 'long', day: 'numeric' }
            :
            { year: 'numeric', month: 'short', day: 'numeric' }

        const [year, month, day] = date.split('T')[0].split('-');
        date = new Date(`${month}-${day}-${year}`);
        return date.toLocaleDateString('en-us', options);
    }

    return formatDate;
}