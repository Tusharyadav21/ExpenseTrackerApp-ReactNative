import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import axios from 'axios';

const StoryPage = () => {
    const [storyData, setStoryData] = useState(true);

    useEffect(() => {
        async function getStoryData() {
            try {
                // const response = await axios.get('https://www.thequint.com/api/v1/stories-by-slug?slug=/opinion/lok-sabha-elections-mayawati-removing-akash-anand-as-bsp-chief-will-further-damage-her-reputation')
                const response = await axios.get('https://www.deccanherald.com/api/v1/stories-by-slug?slug=/world/in-a-murder-suicide-texas-women-tells-her-3-year-old-son-to-say-goodbye-to-daddy-before-shooting-him-3013779')
                setStoryData(response.data.story);
            }
            catch (err) {
                console.log(err);
            }
        }

        getStoryData();
    }, [])

    // console.log('StoryData: ', storyData)

    function removeHTMLTags(text) {
        if (!text) return ''; // Return empty string if text is falsy
        return text.replace(/<[^>]*>/g, ''); // Use regex to replace HTML tags with an empty string
    }


    return (
        <View>
            <Text>{storyData?.headline}</Text>
            {storyData?.cards?.map((card, cardIndex) => (
                card['story-elements'].map((storyText, storyIndex) => (
                    <Text key={`${cardIndex}-${storyIndex}`}>{removeHTMLTags(storyText.text)}</Text>
                ))
            ))}
        </View>
    )
}

export default StoryPage