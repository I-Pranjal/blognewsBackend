import fetch from "node-fetch";

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

export const homeallnews = async (req, res) => {
    try{
        const response = await fetch('https://newsapi.org/v2/top-headlines?country=us&apiKey=858043bd50e64b938b421764116abca7');
        const data = await response.json();
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

export const homesportsnews = async (req, res) => {
    try{
        const response = await fetch('https://newsapi.org/v2/top-headlines?category=sports&country=us&apiKey=331e844264f040ebb02be43ba4a9ddd7');
        const data = await response.json();
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

export const homeentertainmentnews = async (req, res) => {
    try{
        const response = await fetch('https://newsapi.org/v2/top-headlines?category=entertainment&country=us&apiKey=331e844264f040ebb02be43ba4a9ddd7');
        const data = await response.json();
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

export const hometechnologynews = async (req, res) => {
    try{
        const response = await fetch('https://newsapi.org/v2/top-headlines?category=technology&country=us&apiKey=331e844264f040ebb02be43ba4a9ddd7');
        const data = await response.json();
        res.json(data);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

export const homebusinessnews = async (req, res) => {
    try{
        const response = await fetch('https://newsapi.org/v2/top-headlines?category=business&country=us&apiKey=331e844264f040ebb02be43ba4a9ddd7');
        const data = await response.json();
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}
