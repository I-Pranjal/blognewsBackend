export const latestpost = async (req, res) => {
    try{
        const response = await fetch('https://newsapi.org/v2/top-headlines?country=us&apiKey=858043bd50e64b938b421764116abca7');
        const data = await response.json();
        const titles = data.articles.map(article => article.title);
        res.status(200).json(titles);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}