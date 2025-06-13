import streamlit as st
import os
from mem0 import Memory
from multion.client import MultiOn
from openai import OpenAI

st.title("AI Research Agent with Memory 📚")

api_keys = {k: st.text_input(f"{k.capitalize()} API Key", type="password") for k in ['openai', 'multion']}

if all(api_keys.values()):
    os.environ['OPENAI_API_KEY'] = api_keys['openai']
    # Initialize Mem0 with Qdrant
    config = {
        "vector_store": {
            "provider": "qdrant",
            "config": {
                "model": "gpt-4o-mini",
                "host": "localhost",
                "port": 6333,
            }
        },
    }
    memory, multion, openai_client = Memory.from_config(config), MultiOn(api_key=api_keys['multion']), OpenAI(api_key=api_keys['openai'])

    user_id = st.sidebar.text_input("Enter your Username")
    #user_interests = st.text_area("Research interests and background")

    search_query = st.text_input("Research paper search query")

    def process_with_gpt4(result):
        """Processes an arXiv search result to produce a structured markdown output.

    This function takes a search result from arXiv and generates a markdown-formatted
    table containing details about each paper. The table includes columns for the 
    paper's title, authors, a brief abstract, and a link to the paper on arXiv. 

    Args:
        result (str): The raw search result from arXiv, typically in a text format.

    Returns:
        str: A markdown-formatted string containing a table with paper details."""
        prompt = f"""
        Based on the following arXiv search result, provide a proper structured output in markdown that is readable by the users. 
        Each paper should have a title, authors, abstract, and link.
        Search Result: {result}
        Output Format: Table with the following columns: [{{"title": "Paper Title", "authors": "Author Names", "abstract": "Brief abstract", "link": "arXiv link"}}, ...]
        """
        response = openai_client.chat.completions.create(model="gpt-4o-mini", messages=[{"role": "user", "content": prompt}], temperature=0.2)
        return response.choices[0].message.content

    if st.button('Search for Papers'):
        with st.spinner('Searching and Processing...'):
            relevant_memories = memory.search(search_query, user_id=user_id, limit=3)
            prompt = f"Search for arXiv papers: {search_query}\nUser background: {' '.join(mem['text'] for mem in relevant_memories)}"
            result = process_with_gpt4(multion.browse(cmd=prompt, url="https://arxiv.org/"))
            st.markdown(result)

    if st.sidebar.button("View Memory"):
        st.sidebar.write("\n".join([f"- {mem['text']}" for mem in memory.get_all(user_id=user_id)]))

else:
    st.warning("Please enter your API keys to use this app.")
    import streamlit as st
from mem0 import Memory
from openai import OpenAI
import os
from litellm import completion

st.title("Multi-LLM App with Shared Memory 🧠")
st.caption("LLM App with a personalized memory layer that remembers each user's choices and interests across multiple users and LLMs")

openai_api_key = st.text_input("Enter OpenAI API Key", type="password")
anthropic_api_key = st.text_input("Enter Anthropic API Key", type="password")

if openai_api_key and anthropic_api_key:
    os.environ["ANTHROPIC_API_KEY"] = anthropic_api_key

    # Initialize Mem0 with Qdrant
    config = {
        "vector_store": {
            "provider": "qdrant",
            "config": {
                "host": "localhost",
                "port": 6333,
            }
        },
    }

    memory = Memory.from_config(config)

    user_id = st.sidebar.text_input("Enter your Username")
    llm_choice = st.sidebar.radio("Select LLM", ('OpenAI GPT-4o', 'Claude Sonnet 3.5'))

    if llm_choice == 'OpenAI GPT-4o':
        client = OpenAI(api_key=openai_api_key)
    elif llm_choice == 'Claude Sonnet 3.5':
        config = {
            "llm": {
                "provider": "litellm",
                "config": {
                    "model": "claude-3-5-sonnet-20240620",
                    "temperature": 0.5,
                    "max_tokens": 2000,
                }
            }
        }
        client = Memory.from_config(config)

    prompt = st.text_input("Ask the LLM")

    if st.button('Chat with LLM'):
        with st.spinner('Searching...'):
            relevant_memories = memory.search(query=prompt, user_id=user_id)
            context = "Relevant past information:\n"
            if relevant_memories and "results" in relevant_memories:
                for memory in relevant_memories["results"]:
                    if "memory" in memory:
                        context += f"- {memory['memory']}\n"
                
            full_prompt = f"{context}\nHuman: {prompt}\nAI:"

            if llm_choice == 'OpenAI GPT-4o':
                response = client.chat.completions.create(
                    model="gpt-4o",
                    messages=[
                        {"role": "system", "content": "You are a helpful assistant with access to past conversations."},
                        {"role": "user", "content": full_prompt}
                    ]
                )
                answer = response.choices[0].message.content
            elif llm_choice == 'Claude Sonnet 3.5':
                messages=[
                        {"role": "system", "content": "You are a helpful assistant with access to past conversations."},
                        {"role": "user", "content": full_prompt}
                    ]
                response = completion(model="claude-3-5-sonnet-20240620", messages=messages)
                answer = response.choices[0].message.content
            st.write("Answer: ", answer)

            memory.add(answer, user_id=user_id)

    # Sidebar option to show memory
    st.sidebar.title("Memory Info")
    if st.button("View My Memory"):
            memories = memory.get_all(user_id=user_id)
            if memories and "results" in memories:
                st.write(f"Memory history for **{user_id}**:")
                for mem in memories["results"]:
                    if "memory" in mem:
                        st.write(f"- {mem['memory']}")
            else:
                st.sidebar.info("No learning history found for this user ID.")
                import streamlit as st
from ollama import Client

# Initialize Ollama client
client = Client()

# Set up Streamlit page
st.set_page_config(page_title="Local ChatGPT Clone", page_icon="🤖", layout="wide")
st.title("🤖 Local ChatGPT Clone")

# Initialize chat history
if "messages" not in st.session_state:
    st.session_state.messages = []

# Display chat messages
for message in st.session_state.messages:
    with st.chat_message(message["role"]):
        st.markdown(message["content"])

# User input
if prompt := st.chat_input("What's on your mind?"):
    st.session_state.messages.append({"role": "user", "content": prompt})
    with st.chat_message("user"):
        st.markdown(prompt)

    # Generate AI response
    with st.chat_message("assistant"):
        message_placeholder = st.empty()
        full_response = ""
        for response in client.chat(model="llama3.1:latest", messages=st.session_state.messages, stream=True):
            full_response += response['message']['content']
            message_placeholder.markdown(full_response + "▌")
        message_placeholder.markdown(full_response)
    st.session_state.messages.append({"role": "assistant", "content": full_response})

# Add a sidebar with information
st.sidebar.title("About")
st.sidebar.info("This is a local ChatGPT clone using Ollama's llama3.1:latest model and Streamlit.")
st.sidebar.markdown("---")
st.sidebar.markdown("Made with ❤️ by Your Name")
import streamlit as st
from scrapegraphai.graphs import SmartScraperGraph

# Streamlit app title
st.title("AI Web Scraper")

# Input fields for user prompt and source URL
prompt = st.text_input("Enter the information you want to extract:")
source_url = st.text_input("Enter the source URL:")

# Input field for OpenAI API key
api_key = st.text_input("Enter your OpenAI API key:", type="password")

# Configuration for the scraping pipeline
graph_config = {
    "llm": {
        "api_key": api_key,
        "model": "openai/gpt-4o-mini",
    },
    "verbose": True,
    "headless": False,
}

# Button to start the scraping process
if st.button("Scrape"):
    if prompt and source_url and api_key:
        # Create the SmartScraperGraph instance
        smart_scraper_graph = SmartScraperGraph(
            prompt=prompt,
            source=source_url,
            config=graph_config
        )

        # Run the pipeline
        result = smart_scraper_graph.run()

        # Display the result
        st.write(result)
    else:
        st.error("Please provide all the required inputs.")

# Instructions for the user
st.markdown("""
### Instructions
1. Enter the information you want to extract in the first input box.
2. Enter the source URL from which you want to extract the information.
3. Enter your OpenAI API key.
4. Click on the "Scrape" button to start the scraping process.
""")
import streamlit as st
from exa_py import Exa
from agno.agent import Agent
from agno.tools.firecrawl import FirecrawlTools
from agno.models.openai import OpenAIChat
from agno.tools.duckduckgo import DuckDuckGoTools
import pandas as pd
import requests
from firecrawl import FirecrawlApp
from pydantic import BaseModel, Field
from typing import List, Optional
import json

# Streamlit UI
st.set_page_config(page_title="AI Competitor Intelligence Agent Team", layout="wide")

# Sidebar for API keys
st.sidebar.title("API Keys")
openai_api_key = st.sidebar.text_input("OpenAI API Key", type="password")
firecrawl_api_key = st.sidebar.text_input("Firecrawl API Key", type="password")

# Add search engine selection before API keys
search_engine = st.sidebar.selectbox(
    "Select Search Endpoint",
    options=["Perplexity AI - Sonar Pro", "Exa AI"],
    help="Choose which AI service to use for finding competitor URLs"
)

# Show relevant API key input based on selection
if search_engine == "Perplexity AI - Sonar Pro":
    perplexity_api_key = st.sidebar.text_input("Perplexity API Key", type="password")
    # Store API keys in session state
    if openai_api_key and firecrawl_api_key and perplexity_api_key:
        st.session_state.openai_api_key = openai_api_key
        st.session_state.firecrawl_api_key = firecrawl_api_key
        st.session_state.perplexity_api_key = perplexity_api_key
    else:
        st.sidebar.warning("Please enter all required API keys to proceed.")
else:  # Exa AI
    exa_api_key = st.sidebar.text_input("Exa API Key", type="password")
    # Store API keys in session state
    if openai_api_key and firecrawl_api_key and exa_api_key:
        st.session_state.openai_api_key = openai_api_key
        st.session_state.firecrawl_api_key = firecrawl_api_key
        st.session_state.exa_api_key = exa_api_key
    else:
        st.sidebar.warning("Please enter all required API keys to proceed.")

# Main UI
st.title("🧲 AI Competitor Intelligence Agent Team")
st.info(
    """
    This app helps businesses analyze their competitors by extracting structured data from competitor websites and generating insights using AI.
    - Provide a **URL** or a **description** of your company.
    - The app will fetch competitor URLs, extract relevant information, and generate a detailed analysis report.
    """
)
st.success("For better results, provide both URL and a 5-6 word description of your company!")

# Input fields for URL and description
url = st.text_input("Enter your company URL :")
description = st.text_area("Enter a description of your company (if URL is not available):")

# Initialize API keys and tools
if "openai_api_key" in st.session_state and "firecrawl_api_key" in st.session_state:
    if (search_engine == "Perplexity AI - Sonar Pro" and "perplexity_api_key" in st.session_state) or \
       (search_engine == "Exa AI" and "exa_api_key" in st.session_state):
        
        # Initialize Exa only if selected
        if search_engine == "Exa AI":
            exa = Exa(api_key=st.session_state.exa_api_key)

        firecrawl_tools = FirecrawlTools(
            api_key=st.session_state.firecrawl_api_key,
            scrape=False,
            crawl=True,
            limit=5
        )

        firecrawl_agent = Agent(
            model=OpenAIChat(id="gpt-4o", api_key=st.session_state.openai_api_key),
            tools=[firecrawl_tools, DuckDuckGoTools()],
            show_tool_calls=True,
            markdown=True
        )

        analysis_agent = Agent(
            model=OpenAIChat(id="gpt-4o", api_key=st.session_state.openai_api_key),
            show_tool_calls=True,
            markdown=True
        )

        # New agent for comparing competitor data
        comparison_agent = Agent(
            model=OpenAIChat(id="gpt-4o", api_key=st.session_state.openai_api_key),
            show_tool_calls=True,
            markdown=True
        )

        def get_competitor_urls(url: str = None, description: str = None) -> list[str]:
            if not url and not description:
                raise ValueError("Please provide either a URL or a description.")

            if search_engine == "Perplexity AI - Sonar Pro":
                perplexity_url = "https://api.perplexity.ai/chat/completions"
                
                content = "Find me 3 competitor company URLs similar to the company with "
                if url and description:
                    content += f"URL: {url} and description: {description}"
                elif url:
                    content += f"URL: {url}"
                else:
                    content += f"description: {description}"
                content += ". ONLY RESPOND WITH THE URLS, NO OTHER TEXT."

                payload = {
                    "model": "sonar-pro",
                    "messages": [
                        {
                            "role": "system",
                            "content": "Be precise and only return 3 company URLs ONLY."
                        },
                        {
                            "role": "user",
                            "content": content
                        }
                    ],
                    "max_tokens": 1000,
                    "temperature": 0.2,
                }
                
                headers = {
                    "Authorization": f"Bearer {st.session_state.perplexity_api_key}",
                    "Content-Type": "application/json"
                }

                try:
                    response = requests.post(perplexity_url, json=payload, headers=headers)
                    response.raise_for_status()
                    urls = response.json()['choices'][0]['message']['content'].strip().split('\n')
                    return [url.strip() for url in urls if url.strip()]
                except Exception as e:
                    st.error(f"Error fetching competitor URLs from Perplexity: {str(e)}")
                    return []

            else:  # Exa AI
                try:
                    if url:
                        result = exa.find_similar(
                            url=url,
                            num_results=3,
                            exclude_source_domain=True,
                            category="company"
                        )
                    else:
                        result = exa.search(
                            description,
                            type="neural",
                            category="company",
                            use_autoprompt=True,
                            num_results=3
                        )
                    return [item.url for item in result.results]
                except Exception as e:
                    st.error(f"Error fetching competitor URLs from Exa: {str(e)}")
                    return []

        class CompetitorDataSchema(BaseModel):
            company_name: str = Field(description="Name of the company")
            pricing: str = Field(description="Pricing details, tiers, and plans")
            key_features: List[str] = Field(description="Main features and capabilities of the product/service")
            tech_stack: List[str] = Field(description="Technologies, frameworks, and tools used")
            marketing_focus: str = Field(description="Main marketing angles and target audience")
            customer_feedback: str = Field(description="Customer testimonials, reviews, and feedback")

        def extract_competitor_info(competitor_url: str) -> Optional[dict]:
            try:
                # Initialize FirecrawlApp with API key
                app = FirecrawlApp(api_key=st.session_state.firecrawl_api_key)
                
                # Add wildcard to crawl subpages
                url_pattern = f"{competitor_url}/*"
                
                extraction_prompt = """
                Extract detailed information about the company's offerings, including:
                - Company name and basic information
                - Pricing details, plans, and tiers
                - Key features and main capabilities
                - Technology stack and technical details
                - Marketing focus and target audience
                - Customer feedback and testimonials
                
                Analyze the entire website content to provide comprehensive information for each field.
                """
                
                response = app.extract(
                    [url_pattern],
                    {
                        'prompt': extraction_prompt,
                        'schema': CompetitorDataSchema.model_json_schema(),
                    }
                )
                
                if response.get('success') and response.get('data'):
                    extracted_info = response['data']
                    
                    # Create JSON structure
                    competitor_json = {
                        "competitor_url": competitor_url,
                        "company_name": extracted_info.get('company_name', 'N/A'),
                        "pricing": extracted_info.get('pricing', 'N/A'),
                        "key_features": extracted_info.get('key_features', [])[:5],  # Top 5 features
                        "tech_stack": extracted_info.get('tech_stack', [])[:5],      # Top 5 tech stack items
                        "marketing_focus": extracted_info.get('marketing_focus', 'N/A'),
                        "customer_feedback": extracted_info.get('customer_feedback', 'N/A')
                    }
                    
                    return competitor_json
                    
                else:
                    return None
                    
            except Exception as e:
                return None

        def generate_comparison_report(competitor_data: list) -> None:
            # Format the competitor data for the prompt
            formatted_data = json.dumps(competitor_data, indent=2)
            print(formatted_data)
            
            # Updated system prompt for more structured output
            system_prompt = f"""
            As an expert business analyst, analyze the following competitor data in JSON format and create a structured comparison.
            Extract and summarize the key information into concise points.

            {formatted_data}

            Return the data in a structured format with EXACTLY these columns:
            Company, Pricing, Key Features, Tech Stack, Marketing Focus, Customer Feedback

            Rules:
            1. For Company: Include company name and URL
            2. For Key Features: List top 3 most important features only
            3. For Tech Stack: List top 3 most relevant technologies only
            4. Keep all entries clear and concise
            5. Format feedback as brief quotes
            6. Return ONLY the structured data, no additional text
            """

            # Get comparison data from agent
            comparison_response = comparison_agent.run(system_prompt)
            
            try:
                # Split the response into lines and clean them
                table_lines = [
                    line.strip() 
                    for line in comparison_response.content.split('\n') 
                    if line.strip() and '|' in line
                ]
                
                # Extract headers (first row)
                headers = [
                    col.strip() 
                    for col in table_lines[0].split('|') 
                    if col.strip()
                ]
                
                # Extract data rows (skip header and separator rows)
                data_rows = []
                for line in table_lines[2:]:  # Skip header and separator rows
                    row_data = [
                        cell.strip() 
                        for cell in line.split('|') 
                        if cell.strip()
                    ]
                    if len(row_data) == len(headers):
                        data_rows.append(row_data)
                
                # Create DataFrame
                df = pd.DataFrame(
                    data_rows,
                    columns=headers
                )
                
                # Display the table
                st.subheader("Competitor Comparison")
                st.table(df)
                
            except Exception as e:
                st.error(f"Error creating comparison table: {str(e)}")
                st.write("Raw comparison data for debugging:", comparison_response.content)

        def generate_analysis_report(competitor_data: list):
            # Format the competitor data for the prompt
            formatted_data = json.dumps(competitor_data, indent=2)
            print("Analysis Data:", formatted_data)  # For debugging
            
            report = analysis_agent.run(
                f"""Analyze the following competitor data in JSON format and identify market opportunities to improve my own company:
                
                {formatted_data}

                Tasks:
                1. Identify market gaps and opportunities based on competitor offerings
                2. Analyze competitor weaknesses that we can capitalize on
                3. Recommend unique features or capabilities we should develop
                4. Suggest pricing and positioning strategies to gain competitive advantage
                5. Outline specific growth opportunities in underserved market segments
                6. Provide actionable recommendations for product development and go-to-market strategy

                Focus on finding opportunities where we can differentiate and do better than competitors.
                Highlight any unmet customer needs or pain points we can address.
                """
            )
            return report.content

        # Run analysis when the user clicks the button
        if st.button("Analyze Competitors"):
            if url or description:
                with st.spinner("Fetching competitor URLs..."):
                    competitor_urls = get_competitor_urls(url=url, description=description)
                    st.write(f"Competitor URLs: {competitor_urls}")
                
                competitor_data = []
                for comp_url in competitor_urls:
                    with st.spinner(f"Analyzing Competitor: {comp_url}..."):
                        competitor_info = extract_competitor_info(comp_url)
                        if competitor_info is not None:
                            competitor_data.append(competitor_info)
                
                if competitor_data:
                    # Generate and display comparison report
                    with st.spinner("Generating comparison table..."):
                        generate_comparison_report(competitor_data)
                    
                    # Generate and display final analysis report
                    with st.spinner("Generating analysis report..."):
                        analysis_report = generate_analysis_report(competitor_data)
                        st.subheader("Competitor Analysis Report")
                        st.markdown(analysis_report)
                    
                    st.success("Analysis complete!")
                else:
                    st.error("Could not extract data from any competitor URLs")
            else:
                st.error("Please provide either a URL or a description.")
                import streamlit as st
from exa_py import Exa
from agno.agent import Agent
from agno.tools.firecrawl import FirecrawlTools
from agno.models.openai import OpenAIChat
from agno.tools.duckduckgo import DuckDuckGoTools
import pandas as pd
import requests
from firecrawl import FirecrawlApp
from pydantic import BaseModel, Field
from typing import List, Optional
import json

# Streamlit UI
st.set_page_config(page_title="AI Competitor Intelligence Agent Team", layout="wide")

# Sidebar for API keys
st.sidebar.title("API Keys")
openai_api_key = st.sidebar.text_input("OpenAI API Key", type="password")
firecrawl_api_key = st.sidebar.text_input("Firecrawl API Key", type="password")

# Add search engine selection before API keys
search_engine = st.sidebar.selectbox(
    "Select Search Endpoint",
    options=["Perplexity AI - Sonar Pro", "Exa AI"],
    help="Choose which AI service to use for finding competitor URLs"
)

# Show relevant API key input based on selection
if search_engine == "Perplexity AI - Sonar Pro":
    perplexity_api_key = st.sidebar.text_input("Perplexity API Key", type="password")
    # Store API keys in session state
    if openai_api_key and firecrawl_api_key and perplexity_api_key:
        st.session_state.openai_api_key = openai_api_key
        st.session_state.firecrawl_api_key = firecrawl_api_key
        st.session_state.perplexity_api_key = perplexity_api_key
    else:
        st.sidebar.warning("Please enter all required API keys to proceed.")
else:  # Exa AI
    exa_api_key = st.sidebar.text_input("Exa API Key", type="password")
    # Store API keys in session state
    if openai_api_key and firecrawl_api_key and exa_api_key:
        st.session_state.openai_api_key = openai_api_key
        st.session_state.firecrawl_api_key = firecrawl_api_key
        st.session_state.exa_api_key = exa_api_key
    else:
        st.sidebar.warning("Please enter all required API keys to proceed.")

# Main UI
st.title("🧲 AI Competitor Intelligence Agent Team")
st.info(
    """
    This app helps businesses analyze their competitors by extracting structured data from competitor websites and generating insights using AI.
    - Provide a **URL** or a **description** of your company.
    - The app will fetch competitor URLs, extract relevant information, and generate a detailed analysis report.
    """
)
st.success("For better results, provide both URL and a 5-6 word description of your company!")

# Input fields for URL and description
url = st.text_input("Enter your company URL :")
description = st.text_area("Enter a description of your company (if URL is not available):")

# Initialize API keys and tools
if "openai_api_key" in st.session_state and "firecrawl_api_key" in st.session_state:
    if (search_engine == "Perplexity AI - Sonar Pro" and "perplexity_api_key" in st.session_state) or \
       (search_engine == "Exa AI" and "exa_api_key" in st.session_state):
        
        # Initialize Exa only if selected
        if search_engine == "Exa AI":
            exa = Exa(api_key=st.session_state.exa_api_key)

        firecrawl_tools = FirecrawlTools(
            api_key=st.session_state.firecrawl_api_key,
            scrape=False,
            crawl=True,
            limit=5
        )

        firecrawl_agent = Agent(
            model=OpenAIChat(id="gpt-4o", api_key=st.session_state.openai_api_key),
            tools=[firecrawl_tools, DuckDuckGoTools()],
            show_tool_calls=True,
            markdown=True
        )

        analysis_agent = Agent(
            model=OpenAIChat(id="gpt-4o", api_key=st.session_state.openai_api_key),
            show_tool_calls=True,
            markdown=True
        )

        # New agent for comparing competitor data
        comparison_agent = Agent(
            model=OpenAIChat(id="gpt-4o", api_key=st.session_state.openai_api_key),
            show_tool_calls=True,
            markdown=True
        )

        def get_competitor_urls(url: str = None, description: str = None) -> list[str]:
            if not url and not description:
                raise ValueError("Please provide either a URL or a description.")

            if search_engine == "Perplexity AI - Sonar Pro":
                perplexity_url = "https://api.perplexity.ai/chat/completions"
                
                content = "Find me 3 competitor company URLs similar to the company with "
                if url and description:
                    content += f"URL: {url} and description: {description}"
                elif url:
                    content += f"URL: {url}"
                else:
                    content += f"description: {description}"
                content += ". ONLY RESPOND WITH THE URLS, NO OTHER TEXT."

                payload = {
                    "model": "sonar-pro",
                    "messages": [
                        {
                            "role": "system",
                            "content": "Be precise and only return 3 company URLs ONLY."
                        },
                        {
                            "role": "user",
                            "content": content
                        }
                    ],
                    "max_tokens": 1000,
                    "temperature": 0.2,
                }
                
                headers = {
                    "Authorization": f"Bearer {st.session_state.perplexity_api_key}",
                    "Content-Type": "application/json"
                }

                try:
                    response = requests.post(perplexity_url, json=payload, headers=headers)
                    response.raise_for_status()
                    urls = response.json()['choices'][0]['message']['content'].strip().split('\n')
                    return [url.strip() for url in urls if url.strip()]
                except Exception as e:
                    st.error(f"Error fetching competitor URLs from Perplexity: {str(e)}")
                    return []

            else:  # Exa AI
                try:
                    if url:
                        result = exa.find_similar(
                            url=url,
                            num_results=3,
                            exclude_source_domain=True,
                            category="company"
                        )
                    else:
                        result = exa.search(
                            description,
                            type="neural",
                            category="company",
                            use_autoprompt=True,
                            num_results=3
                        )
                    return [item.url for item in result.results]
                except Exception as e:
                    st.error(f"Error fetching competitor URLs from Exa: {str(e)}")
                    return []

        class CompetitorDataSchema(BaseModel):
            company_name: str = Field(description="Name of the company")
            pricing: str = Field(description="Pricing details, tiers, and plans")
            key_features: List[str] = Field(description="Main features and capabilities of the product/service")
            tech_stack: List[str] = Field(description="Technologies, frameworks, and tools used")
            marketing_focus: str = Field(description="Main marketing angles and target audience")
            customer_feedback: str = Field(description="Customer testimonials, reviews, and feedback")

        def extract_competitor_info(competitor_url: str) -> Optional[dict]:
            try:
                # Initialize FirecrawlApp with API key
                app = FirecrawlApp(api_key=st.session_state.firecrawl_api_key)
                
                # Add wildcard to crawl subpages
                url_pattern = f"{competitor_url}/*"
                
                extraction_prompt = """
                Extract detailed information about the company's offerings, including:
                - Company name and basic information
                - Pricing details, plans, and tiers
                - Key features and main capabilities
                - Technology stack and technical details
                - Marketing focus and target audience
                - Customer feedback and testimonials
                
                Analyze the entire website content to provide comprehensive information for each field.
                """
                
                response = app.extract(
                    [url_pattern],
                    {
                        'prompt': extraction_prompt,
                        'schema': CompetitorDataSchema.model_json_schema(),
                    }
                )
                
                if response.get('success') and response.get('data'):
                    extracted_info = response['data']
                    
                    # Create JSON structure
                    competitor_json = {
                        "competitor_url": competitor_url,
                        "company_name": extracted_info.get('company_name', 'N/A'),
                        "pricing": extracted_info.get('pricing', 'N/A'),
                        "key_features": extracted_info.get('key_features', [])[:5],  # Top 5 features
                        "tech_stack": extracted_info.get('tech_stack', [])[:5],      # Top 5 tech stack items
                        "marketing_focus": extracted_info.get('marketing_focus', 'N/A'),
                        "customer_feedback": extracted_info.get('customer_feedback', 'N/A')
                    }
                    
                    return competitor_json
                    
                else:
                    return None
                    
            except Exception as e:
                return None

        def generate_comparison_report(competitor_data: list) -> None:
            # Format the competitor data for the prompt
            formatted_data = json.dumps(competitor_data, indent=2)
            print(formatted_data)
            
            # Updated system prompt for more structured output
            system_prompt = f"""
            As an expert business analyst, analyze the following competitor data in JSON format and create a structured comparison.
            Extract and summarize the key information into concise points.

            {formatted_data}

            Return the data in a structured format with EXACTLY these columns:
            Company, Pricing, Key Features, Tech Stack, Marketing Focus, Customer Feedback

            Rules:
            1. For Company: Include company name and URL
            2. For Key Features: List top 3 most important features only
            3. For Tech Stack: List top 3 most relevant technologies only
            4. Keep all entries clear and concise
            5. Format feedback as brief quotes
            6. Return ONLY the structured data, no additional text
            """

            # Get comparison data from agent
            comparison_response = comparison_agent.run(system_prompt)
            
            try:
                # Split the response into lines and clean them
                table_lines = [
                    line.strip() 
                    for line in comparison_response.content.split('\n') 
                    if line.strip() and '|' in line
                ]
                
                # Extract headers (first row)
                headers = [
                    col.strip() 
                    for col in table_lines[0].split('|') 
                    if col.strip()
                ]
                
                # Extract data rows (skip header and separator rows)
                data_rows = []
                for line in table_lines[2:]:  # Skip header and separator rows
                    row_data = [
                        cell.strip() 
                        for cell in line.split('|') 
                        if cell.strip()
                    ]
                    if len(row_data) == len(headers):
                        data_rows.append(row_data)
                
                # Create DataFrame
                df = pd.DataFrame(
                    data_rows,
                    columns=headers
                )
                
                # Display the table
                st.subheader("Competitor Comparison")
                st.table(df)
                
            except Exception as e:
                st.error(f"Error creating comparison table: {str(e)}")
                st.write("Raw comparison data for debugging:", comparison_response.content)

        def generate_analysis_report(competitor_data: list):
            # Format the competitor data for the prompt
            formatted_data = json.dumps(competitor_data, indent=2)
            print("Analysis Data:", formatted_data)  # For debugging
            
            report = analysis_agent.run(
                f"""Analyze the following competitor data in JSON format and identify market opportunities to improve my own company:
                
                {formatted_data}

                Tasks:
                1. Identify market gaps and opportunities based on competitor offerings
                2. Analyze competitor weaknesses that we can capitalize on
                3. Recommend unique features or capabilities we should develop
                4. Suggest pricing and positioning strategies to gain competitive advantage
                5. Outline specific growth opportunities in underserved market segments
                6. Provide actionable recommendations for product development and go-to-market strategy

                Focus on finding opportunities where we can differentiate and do better than competitors.
                Highlight any unmet customer needs or pain points we can address.
                """
            )
            return report.content

        # Run analysis when the user clicks the button
        if st.button("Analyze Competitors"):
            if url or description:
                with st.spinner("Fetching competitor URLs..."):
                    competitor_urls = get_competitor_urls(url=url, description=description)
                    st.write(f"Competitor URLs: {competitor_urls}")
                
                competitor_data = []
                for comp_url in competitor_urls:
                    with st.spinner(f"Analyzing Competitor: {comp_url}..."):
                        competitor_info = extract_competitor_info(comp_url)
                        if competitor_info is not None:
                            competitor_data.append(competitor_info)
                
                if competitor_data:
                    # Generate and display comparison report
                    with st.spinner("Generating comparison table..."):
                        generate_comparison_report(competitor_data)
                    
                    # Generate and display final analysis report
                    with st.spinner("Generating analysis report..."):
                        analysis_report = generate_analysis_report(competitor_data)
                        st.subheader("Competitor Analysis Report")
                        st.markdown(analysis_report)
                    
                    st.success("Analysis complete!")
                else:
                    st.error("Could not extract data from any competitor URLs")
            else:
                st.error("Please provide either a URL or a description.")import streamlit as st
                from exa_py import Exa
                from agno.agent import Agent
                from agno.tools.firecrawl import FirecrawlTools
                from agno.models.openai import OpenAIChat
                from agno.tools.duckduckgo import DuckDuckGoTools
                import pandas as pd
                import requests
                from firecrawl import FirecrawlApp
                from pydantic import BaseModel, Field
                from typing import List, Optional
                import json
                
                # Streamlit UI
                st.set_page_config(page_title="AI Competitor Intelligence Agent Team", layout="wide")
                
                # Sidebar for API keys
                st.sidebar.title("API Keys")
                openai_api_key = st.sidebar.text_input("OpenAI API Key", type="password")
                firecrawl_api_key = st.sidebar.text_input("Firecrawl API Key", type="password")
                
                # Add search engine selection before API keys
                search_engine = st.sidebar.selectbox(
                    "Select Search Endpoint",
                    options=["Perplexity AI - Sonar Pro", "Exa AI"],
                    help="Choose which AI service to use for finding competitor URLs"
                )
                
                # Show relevant API key input based on selection
                if search_engine == "Perplexity AI - Sonar Pro":
                    perplexity_api_key = st.sidebar.text_input("Perplexity API Key", type="password")
                    # Store API keys in session state
                    if openai_api_key and firecrawl_api_key and perplexity_api_key:
                        st.session_state.openai_api_key = openai_api_key
                        st.session_state.firecrawl_api_key = firecrawl_api_key
                        st.session_state.perplexity_api_key = perplexity_api_key
                    else:
                        st.sidebar.warning("Please enter all required API keys to proceed.")
                else:  # Exa AI
                    exa_api_key = st.sidebar.text_input("Exa API Key", type="password")
                    # Store API keys in session state
                    if openai_api_key and firecrawl_api_key and exa_api_key:
                        st.session_state.openai_api_key = openai_api_key
                        st.session_state.firecrawl_api_key = firecrawl_api_key
                        st.session_state.exa_api_key = exa_api_key
                    else:
                        st.sidebar.warning("Please enter all required API keys to proceed.")
                
                # Main UI
                st.title("🧲 AI Competitor Intelligence Agent Team")
                st.info(
                    """
                    This app helps businesses analyze their competitors by extracting structured data from competitor websites and generating insights using AI.
                    - Provide a **URL** or a **description** of your company.
                    - The app will fetch competitor URLs, extract relevant information, and generate a detailed analysis report.
                    """
                )
                st.success("For better results, provide both URL and a 5-6 word description of your company!")
                
                # Input fields for URL and description
                url = st.text_input("Enter your company URL :")
                description = st.text_area("Enter a description of your company (if URL is not available):")
                
                # Initialize API keys and tools
                if "openai_api_key" in st.session_state and "firecrawl_api_key" in st.session_state:
                    if (search_engine == "Perplexity AI - Sonar Pro" and "perplexity_api_key" in st.session_state) or \
                       (search_engine == "Exa AI" and "exa_api_key" in st.session_state):
                        
                        # Initialize Exa only if selected
                        if search_engine == "Exa AI":
                            exa = Exa(api_key=st.session_state.exa_api_key)
                
                        firecrawl_tools = FirecrawlTools(
                            api_key=st.session_state.firecrawl_api_key,
                            scrape=False,
                            crawl=True,
                            limit=5
                        )
                
                        firecrawl_agent = Agent(
                            model=OpenAIChat(id="gpt-4o", api_key=st.session_state.openai_api_key),
                            tools=[firecrawl_tools, DuckDuckGoTools()],
                            show_tool_calls=True,
                            markdown=True
                        )
                
                        analysis_agent = Agent(
                            model=OpenAIChat(id="gpt-4o", api_key=st.session_state.openai_api_key),
                            show_tool_calls=True,
                            markdown=True
                        )
                
                        # New agent for comparing competitor data
                        comparison_agent = Agent(
                            model=OpenAIChat(id="gpt-4o", api_key=st.session_state.openai_api_key),
                            show_tool_calls=True,
                            markdown=True
                        )
                
                        def get_competitor_urls(url: str = None, description: str = None) -> list[str]:
                            if not url and not description:
                                raise ValueError("Please provide either a URL or a description.")
                
                            if search_engine == "Perplexity AI - Sonar Pro":
                                perplexity_url = "https://api.perplexity.ai/chat/completions"
                                
                                content = "Find me 3 competitor company URLs similar to the company with "
                                if url and description:
                                    content += f"URL: {url} and description: {description}"
                                elif url:
                                    content += f"URL: {url}"
                                else:
                                    content += f"description: {description}"
                                content += ". ONLY RESPOND WITH THE URLS, NO OTHER TEXT."
                
                                payload = {
                                    "model": "sonar-pro",
                                    "messages": [
                                        {
                                            "role": "system",
                                            "content": "Be precise and only return 3 company URLs ONLY."
                                        },
                                        {
                                            "role": "user",
                                            "content": content
                                        }
                                    ],
                                    "max_tokens": 1000,
                                    "temperature": 0.2,
                                }
                                
                                headers = {
                                    "Authorization": f"Bearer {st.session_state.perplexity_api_key}",
                                    "Content-Type": "application/json"
                                }
                
                                try:
                                    response = requests.post(perplexity_url, json=payload, headers=headers)
                                    response.raise_for_status()
                                    urls = response.json()['choices'][0]['message']['content'].strip().split('\n')
                                    return [url.strip() for url in urls if url.strip()]
                                except Exception as e:
                                    st.error(f"Error fetching competitor URLs from Perplexity: {str(e)}")
                                    return []
                
                            else:  # Exa AI
                                try:
                                    if url:
                                        result = exa.find_similar(
                                            url=url,
                                            num_results=3,
                                            exclude_source_domain=True,
                                            category="company"
                                        )
                                    else:
                                        result = exa.search(
                                            description,
                                            type="neural",
                                            category="company",
                                            use_autoprompt=True,
                                            num_results=3
                                        )
                                    return [item.url for item in result.results]
                                except Exception as e:
                                    st.error(f"Error fetching competitor URLs from Exa: {str(e)}")
                                    return []
                
                        class CompetitorDataSchema(BaseModel):
                            company_name: str = Field(description="Name of the company")
                            pricing: str = Field(description="Pricing details, tiers, and plans")
                            key_features: List[str] = Field(description="Main features and capabilities of the product/service")
                            tech_stack: List[str] = Field(description="Technologies, frameworks, and tools used")
                            marketing_focus: str = Field(description="Main marketing angles and target audience")
                            customer_feedback: str = Field(description="Customer testimonials, reviews, and feedback")
                
                        def extract_competitor_info(competitor_url: str) -> Optional[dict]:
                            try:
                                # Initialize FirecrawlApp with API key
                                app = FirecrawlApp(api_key=st.session_state.firecrawl_api_key)
                                
                                # Add wildcard to crawl subpages
                                url_pattern = f"{competitor_url}/*"
                                
                                extraction_prompt = """
                                Extract detailed information about the company's offerings, including:
                                - Company name and basic information
                                - Pricing details, plans, and tiers
                                - Key features and main capabilities
                                - Technology stack and technical details
                                - Marketing focus and target audience
                                - Customer feedback and testimonials
                                
                                Analyze the entire website content to provide comprehensive information for each field.
                                """
                                
                                response = app.extract(
                                    [url_pattern],
                                    {
                                        'prompt': extraction_prompt,
                                        'schema': CompetitorDataSchema.model_json_schema(),
                                    }
                                )
                                
                                if response.get('success') and response.get('data'):
                                    extracted_info = response['data']
                                    
                                    # Create JSON structure
                                    competitor_json = {
                                        "competitor_url": competitor_url,
                                        "company_name": extracted_info.get('company_name', 'N/A'),
                                        "pricing": extracted_info.get('pricing', 'N/A'),
                                        "key_features": extracted_info.get('key_features', [])[:5],  # Top 5 features
                                        "tech_stack": extracted_info.get('tech_stack', [])[:5],      # Top 5 tech stack items
                                        "marketing_focus": extracted_info.get('marketing_focus', 'N/A'),
                                        "customer_feedback": extracted_info.get('customer_feedback', 'N/A')
                                    }
                                    
                                    return competitor_json
                                    
                                else:
                                    return None
                                    
                            except Exception as e:
                                return None
                
                        def generate_comparison_report(competitor_data: list) -> None:
                            # Format the competitor data for the prompt
                            formatted_data = json.dumps(competitor_data, indent=2)
                            print(formatted_data)
                            
                            # Updated system prompt for more structured output
                            system_prompt = f"""
                            As an expert business analyst, analyze the following competitor data in JSON format and create a structured comparison.
                            Extract and summarize the key information into concise points.
                
                            {formatted_data}
                
                            Return the data in a structured format with EXACTLY these columns:
                            Company, Pricing, Key Features, Tech Stack, Marketing Focus, Customer Feedback
                
                            Rules:
                            1. For Company: Include company name and URL
                            2. For Key Features: List top 3 most important features only
                            3. For Tech Stack: List top 3 most relevant technologies only
                            4. Keep all entries clear and concise
                            5. Format feedback as brief quotes
                            6. Return ONLY the structured data, no additional text
                            """
                
                            # Get comparison data from agent
                            comparison_response = comparison_agent.run(system_prompt)
                            
                            try:
                                # Split the response into lines and clean them
                                table_lines = [
                                    line.strip() 
                                    for line in comparison_response.content.split('\n') 
                                    if line.strip() and '|' in line
                                ]
                                
                                # Extract headers (first row)
                                headers = [
                                    col.strip() 
                                    for col in table_lines[0].split('|') 
                                    if col.strip()
                                ]
                                
                                # Extract data rows (skip header and separator rows)
                                data_rows = []
                                for line in table_lines[2:]:  # Skip header and separator rows
                                    row_data = [
                                        cell.strip() 
                                        for cell in line.split('|') 
                                        if cell.strip()
                                    ]
                                    if len(row_data) == len(headers):
                                        data_rows.append(row_data)
                                
                                # Create DataFrame
                                df = pd.DataFrame(
                                    data_rows,
                                    columns=headers
                                )
                                
                                # Display the table
                                st.subheader("Competitor Comparison")
                                st.table(df)
                                
                            except Exception as e:
                                st.error(f"Error creating comparison table: {str(e)}")
                                st.write("Raw comparison data for debugging:", comparison_response.content)
                
                        def generate_analysis_report(competitor_data: list):
                            # Format the competitor data for the prompt
                            formatted_data = json.dumps(competitor_data, indent=2)
                            print("Analysis Data:", formatted_data)  # For debugging
                            
                            report = analysis_agent.run(
                                f"""Analyze the following competitor data in JSON format and identify market opportunities to improve my own company:
                                
                                {formatted_data}
                
                                Tasks:
                                1. Identify market gaps and opportunities based on competitor offerings
                                2. Analyze competitor weaknesses that we can capitalize on
                                3. Recommend unique features or capabilities we should develop
                                4. Suggest pricing and positioning strategies to gain competitive advantage
                                5. Outline specific growth opportunities in underserved market segments
                                6. Provide actionable recommendations for product development and go-to-market strategy
                
                                Focus on finding opportunities where we can differentiate and do better than competitors.
                                Highlight any unmet customer needs or pain points we can address.
                                """
                            )
                            return report.content
                
                        # Run analysis when the user clicks the button
                        if st.button("Analyze Competitors"):
                            if url or description:
                                with st.spinner("Fetching competitor URLs..."):
                                    competitor_urls = get_competitor_urls(url=url, description=description)
                                    st.write(f"Competitor URLs: {competitor_urls}")
                                
                                competitor_data = []
                                for comp_url in competitor_urls:
                                    with st.spinner(f"Analyzing Competitor: {comp_url}..."):
                                        competitor_info = extract_competitor_info(comp_url)
                                        if competitor_info is not None:
                                            competitor_data.append(competitor_info)
                                
                                if competitor_data:
                                    # Generate and display comparison report
                                    with st.spinner("Generating comparison table..."):
                                        generate_comparison_report(competitor_data)
                                    
                                    # Generate and display final analysis report
                                    with st.spinner("Generating analysis report..."):
                                        analysis_report = generate_analysis_report(competitor_data)
                                        st.subheader("Competitor Analysis Report")
                                        st.markdown(analysis_report)
                                    
                                    st.success("Analysis complete!")
                                else:
                                    st.error("Could not extract data from any competitor URLs")
                            else:
                                st.error("Please provide either a URL or a description.")import streamlit as st
                                from exa_py import Exa
                                from agno.agent import Agent
                                from agno.tools.firecrawl import FirecrawlTools
                                from agno.models.openai import OpenAIChat
                                from agno.tools.duckduckgo import DuckDuckGoTools
                                import pandas as pd
                                import requests
                                from firecrawl import FirecrawlApp
                                from pydantic import BaseModel, Field
                                from typing import List, Optional
                                import json
                                
                                # Streamlit UI
                                st.set_page_config(page_title="AI Competitor Intelligence Agent Team", layout="wide")
                                
                                # Sidebar for API keys
                                st.sidebar.title("API Keys")
                                openai_api_key = st.sidebar.text_input("OpenAI API Key", type="password")
                                firecrawl_api_key = st.sidebar.text_input("Firecrawl API Key", type="password")
                                
                                # Add search engine selection before API keys
                                search_engine = st.sidebar.selectbox(
                                    "Select Search Endpoint",
                                    options=["Perplexity AI - Sonar Pro", "Exa AI"],
                                    help="Choose which AI service to use for finding competitor URLs"
                                )
                                
                                # Show relevant API key input based on selection
                                if search_engine == "Perplexity AI - Sonar Pro":
                                    perplexity_api_key = st.sidebar.text_input("Perplexity API Key", type="password")
                                    # Store API keys in session state
                                    if openai_api_key and firecrawl_api_key and perplexity_api_key:
                                        st.session_state.openai_api_key = openai_api_key
                                        st.session_state.firecrawl_api_key = firecrawl_api_key
                                        st.session_state.perplexity_api_key = perplexity_api_key
                                    else:
                                        st.sidebar.warning("Please enter all required API keys to proceed.")
                                else:  # Exa AI
                                    exa_api_key = st.sidebar.text_input("Exa API Key", type="password")
                                    # Store API keys in session state
                                    if openai_api_key and firecrawl_api_key and exa_api_key:
                                        st.session_state.openai_api_key = openai_api_key
                                        st.session_state.firecrawl_api_key = firecrawl_api_key
                                        st.session_state.exa_api_key = exa_api_key
                                    else:
                                        st.sidebar.warning("Please enter all required API keys to proceed.")
                                
                                # Main UI
                                st.title("🧲 AI Competitor Intelligence Agent Team")
                                st.info(
                                    """
                                    This app helps businesses analyze their competitors by extracting structured data from competitor websites and generating insights using AI.
                                    - Provide a **URL** or a **description** of your company.
                                    - The app will fetch competitor URLs, extract relevant information, and generate a detailed analysis report.
                                    """
                                )
                                st.success("For better results, provide both URL and a 5-6 word description of your company!")
                                
                                # Input fields for URL and description
                                url = st.text_input("Enter your company URL :")
                                description = st.text_area("Enter a description of your company (if URL is not available):")
                                
                                # Initialize API keys and tools
                                if "openai_api_key" in st.session_state and "firecrawl_api_key" in st.session_state:
                                    if (search_engine == "Perplexity AI - Sonar Pro" and "perplexity_api_key" in st.session_state) or \
                                       (search_engine == "Exa AI" and "exa_api_key" in st.session_state):
                                        
                                        # Initialize Exa only if selected
                                        if search_engine == "Exa AI":
                                            exa = Exa(api_key=st.session_state.exa_api_key)
                                
                                        firecrawl_tools = FirecrawlTools(
                                            api_key=st.session_state.firecrawl_api_key,
                                            scrape=False,
                                            crawl=True,
                                            limit=5
                                        )
                                
                                        firecrawl_agent = Agent(
                                            model=OpenAIChat(id="gpt-4o", api_key=st.session_state.openai_api_key),
                                            tools=[firecrawl_tools, DuckDuckGoTools()],
                                            show_tool_calls=True,
                                            markdown=True
                                        )
                                
                                        analysis_agent = Agent(
                                            model=OpenAIChat(id="gpt-4o", api_key=st.session_state.openai_api_key),
                                            show_tool_calls=True,
                                            markdown=True
                                        )
                                
                                        # New agent for comparing competitor data
                                        comparison_agent = Agent(
                                            model=OpenAIChat(id="gpt-4o", api_key=st.session_state.openai_api_key),
                                            show_tool_calls=True,
                                            markdown=True
                                        )
                                
                                        def get_competitor_urls(url: str = None, description: str = None) -> list[str]:
                                            if not url and not description:
                                                raise ValueError("Please provide either a URL or a description.")
                                
                                            if search_engine == "Perplexity AI - Sonar Pro":
                                                perplexity_url = "https://api.perplexity.ai/chat/completions"
                                                
                                                content = "Find me 3 competitor company URLs similar to the company with "
                                                if url and description:
                                                    content += f"URL: {url} and description: {description}"
                                                elif url:
                                                    content += f"URL: {url}"
                                                else:
                                                    content += f"description: {description}"
                                                content += ". ONLY RESPOND WITH THE URLS, NO OTHER TEXT."
                                
                                                payload = {
                                                    "model": "sonar-pro",
                                                    "messages": [
                                                        {
                                                            "role": "system",
                                                            "content": "Be precise and only return 3 company URLs ONLY."
                                                        },
                                                        {
                                                            "role": "user",
                                                            "content": content
                                                        }
                                                    ],
                                                    "max_tokens": 1000,
                                                    "temperature": 0.2,
                                                }
                                                
                                                headers = {
                                                    "Authorization": f"Bearer {st.session_state.perplexity_api_key}",
                                                    "Content-Type": "application/json"
                                                }
                                
                                                try:
                                                    response = requests.post(perplexity_url, json=payload, headers=headers)
                                                    response.raise_for_status()
                                                    urls = response.json()['choices'][0]['message']['content'].strip().split('\n')
                                                    return [url.strip() for url in urls if url.strip()]
                                                except Exception as e:
                                                    st.error(f"Error fetching competitor URLs from Perplexity: {str(e)}")
                                                    return []
                                
                                            else:  # Exa AI
                                                try:
                                                    if url:
                                                        result = exa.find_similar(
                                                            url=url,
                                                            num_results=3,
                                                            exclude_source_domain=True,
                                                            category="company"
                                                        )
                                                    else:
                                                        result = exa.search(
                                                            description,
                                                            type="neural",
                                                            category="company",
                                                            use_autoprompt=True,
                                                            num_results=3
                                                        )
                                                    return [item.url for item in result.results]
                                                except Exception as e:
                                                    st.error(f"Error fetching competitor URLs from Exa: {str(e)}")
                                                    return []
                                
                                        class CompetitorDataSchema(BaseModel):
                                            company_name: str = Field(description="Name of the company")
                                            pricing: str = Field(description="Pricing details, tiers, and plans")
                                            key_features: List[str] = Field(description="Main features and capabilities of the product/service")
                                            tech_stack: List[str] = Field(description="Technologies, frameworks, and tools used")
                                            marketing_focus: str = Field(description="Main marketing angles and target audience")
                                            customer_feedback: str = Field(description="Customer testimonials, reviews, and feedback")
                                
                                        def extract_competitor_info(competitor_url: str) -> Optional[dict]:
                                            try:
                                                # Initialize FirecrawlApp with API key
                                                app = FirecrawlApp(api_key=st.session_state.firecrawl_api_key)
                                                
                                                # Add wildcard to crawl subpages
                                                url_pattern = f"{competitor_url}/*"
                                                
                                                extraction_prompt = """
                                                Extract detailed information about the company's offerings, including:
                                                - Company name and basic information
                                                - Pricing details, plans, and tiers
                                                - Key features and main capabilities
                                                - Technology stack and technical details
                                                - Marketing focus and target audience
                                                - Customer feedback and testimonials
                                                
                                                Analyze the entire website content to provide comprehensive information for each field.
                                                """
                                                
                                                response = app.extract(
                                                    [url_pattern],
                                                    {
                                                        'prompt': extraction_prompt,
                                                        'schema': CompetitorDataSchema.model_json_schema(),
                                                    }
                                                )
                                                
                                                if response.get('success') and response.get('data'):
                                                    extracted_info = response['data']
                                                    
                                                    # Create JSON structure
                                                    competitor_json = {
                                                        "competitor_url": competitor_url,
                                                        "company_name": extracted_info.get('company_name', 'N/A'),
                                                        "pricing": extracted_info.get('pricing', 'N/A'),
                                                        "key_features": extracted_info.get('key_features', [])[:5],  # Top 5 features
                                                        "tech_stack": extracted_info.get('tech_stack', [])[:5],      # Top 5 tech stack items
                                                        "marketing_focus": extracted_info.get('marketing_focus', 'N/A'),
                                                        "customer_feedback": extracted_info.get('customer_feedback', 'N/A')
                                                    }
                                                    
                                                    return competitor_json
                                                    
                                                else:
                                                    return None
                                                    
                                            except Exception as e:
                                                return None
                                
                                        def generate_comparison_report(competitor_data: list) -> None:
                                            # Format the competitor data for the prompt
                                            formatted_data = json.dumps(competitor_data, indent=2)
                                            print(formatted_data)
                                            
                                            # Updated system prompt for more structured output
                                            system_prompt = f"""
                                            As an expert business analyst, analyze the following competitor data in JSON format and create a structured comparison.
                                            Extract and summarize the key information into concise points.
                                
                                            {formatted_data}
                                
                                            Return the data in a structured format with EXACTLY these columns:
                                            Company, Pricing, Key Features, Tech Stack, Marketing Focus, Customer Feedback
                                
                                            Rules:
                                            1. For Company: Include company name and URL
                                            2. For Key Features: List top 3 most important features only
                                            3. For Tech Stack: List top 3 most relevant technologies only
                                            4. Keep all entries clear and concise
                                            5. Format feedback as brief quotes
                                            6. Return ONLY the structured data, no additional text
                                            """
                                
                                            # Get comparison data from agent
                                            comparison_response = comparison_agent.run(system_prompt)
                                            
                                            try:
                                                # Split the response into lines and clean them
                                                table_lines = [
                                                    line.strip() 
                                                    for line in comparison_response.content.split('\n') 
                                                    if line.strip() and '|' in line
                                                ]
                                                
                                                # Extract headers (first row)
                                                headers = [
                                                    col.strip() 
                                                    for col in table_lines[0].split('|') 
                                                    if col.strip()
                                                ]
                                                
                                                # Extract data rows (skip header and separator rows)
                                                data_rows = []
                                                for line in table_lines[2:]:  # Skip header and separator rows
                                                    row_data = [
                                                        cell.strip() 
                                                        for cell in line.split('|') 
                                                        if cell.strip()
                                                    ]
                                                    if len(row_data) == len(headers):
                                                        data_rows.append(row_data)
                                                
                                                # Create DataFrame
                                                df = pd.DataFrame(
                                                    data_rows,
                                                    columns=headers
                                                )
                                                
                                                # Display the table
                                                st.subheader("Competitor Comparison")
                                                st.table(df)
                                                
                                            except Exception as e:
                                                st.error(f"Error creating comparison table: {str(e)}")
                                                st.write("Raw comparison data for debugging:", comparison_response.content)
                                
                                        def generate_analysis_report(competitor_data: list):
                                            # Format the competitor data for the prompt
                                            formatted_data = json.dumps(competitor_data, indent=2)
                                            print("Analysis Data:", formatted_data)  # For debugging
                                            
                                            report = analysis_agent.run(
                                                f"""Analyze the following competitor data in JSON format and identify market opportunities to improve my own company:
                                                
                                                {formatted_data}
                                
                                                Tasks:
                                                1. Identify market gaps and opportunities based on competitor offerings
                                                2. Analyze competitor weaknesses that we can capitalize on
                                                3. Recommend unique features or capabilities we should develop
                                                4. Suggest pricing and positioning strategies to gain competitive advantage
                                                5. Outline specific growth opportunities in underserved market segments
                                                6. Provide actionable recommendations for product development and go-to-market strategy
                                
                                                Focus on finding opportunities where we can differentiate and do better than competitors.
                                                Highlight any unmet customer needs or pain points we can address.
                                                """
                                            )
                                            return report.content
                                
                                        # Run analysis when the user clicks the button
                                        if st.button("Analyze Competitors"):
                                            if url or description:
                                                with st.spinner("Fetching competitor URLs..."):
                                                    competitor_urls = get_competitor_urls(url=url, description=description)
                                                    st.write(f"Competitor URLs: {competitor_urls}")
                                                
                                                competitor_data = []
                                                for comp_url in competitor_urls:
                                                    with st.spinner(f"Analyzing Competitor: {comp_url}..."):
                                                        competitor_info = extract_competitor_info(comp_url)
                                                        if competitor_info is not None:
                                                            competitor_data.append(competitor_info)
                                                
                                                if competitor_data:
                                                    # Generate and display comparison report
                                                    with st.spinner("Generating comparison table..."):
                                                        generate_comparison_report(competitor_data)
                                                    
                                                    # Generate and display final analysis report
                                                    with st.spinner("Generating analysis report..."):
                                                        analysis_report = generate_analysis_report(competitor_data)
                                                        st.subheader("Competitor Analysis Report")
                                                        st.markdown(analysis_report)
                                                    
                                                    st.success("Analysis complete!")
                                                else:
                                                    st.error("Could not extract data from any competitor URLs")
                                            else:
                                                st.error("Please provide either a URL or a description.")import streamlit as st
from exa_py import Exa
from agno.agent import Agent
from agno.tools.firecrawl import FirecrawlTools
from agno.models.openai import OpenAIChat
from agno.tools.duckduckgo import DuckDuckGoTools
import pandas as pd
import requests
from firecrawl import FirecrawlApp
from pydantic import BaseModel, Field
from typing import List, Optional
import json

# Streamlit UI
st.set_page_config(page_title="AI Competitor Intelligence Agent Team", layout="wide")

# Sidebar for API keys
st.sidebar.title("API Keys")
openai_api_key = st.sidebar.text_input("OpenAI API Key", type="password")
firecrawl_api_key = st.sidebar.text_input("Firecrawl API Key", type="password")

# Add search engine selection before API keys
search_engine = st.sidebar.selectbox(
    "Select Search Endpoint",
    options=["Perplexity AI - Sonar Pro", "Exa AI"],
    help="Choose which AI service to use for finding competitor URLs"
)

# Show relevant API key input based on selection
if search_engine == "Perplexity AI - Sonar Pro":
    perplexity_api_key = st.sidebar.text_input("Perplexity API Key", type="password")
    # Store API keys in session state
    if openai_api_key and firecrawl_api_key and perplexity_api_key:
        st.session_state.openai_api_key = openai_api_key
        st.session_state.firecrawl_api_key = firecrawl_api_key
        st.session_state.perplexity_api_key = perplexity_api_key
    else:
        st.sidebar.warning("Please enter all required API keys to proceed.")
else:  # Exa AI
    exa_api_key = st.sidebar.text_input("Exa API Key", type="password")
    # Store API keys in session state
    if openai_api_key and firecrawl_api_key and exa_api_key:
        st.session_state.openai_api_key = openai_api_key
        st.session_state.firecrawl_api_key = firecrawl_api_key
        st.session_state.exa_api_key = exa_api_key
    else:
        st.sidebar.warning("Please enter all required API keys to proceed.")

# Main UI
st.title("🧲 AI Competitor Intelligence Agent Team")
st.info(
    """
    This app helps businesses analyze their competitors by extracting structured data from competitor websites and generating insights using AI.
    - Provide a **URL** or a **description** of your company.
    - The app will fetch competitor URLs, extract relevant information, and generate a detailed analysis report.
    """
)
st.success("For better results, provide both URL and a 5-6 word description of your company!")

# Input fields for URL and description
url = st.text_input("Enter your company URL :")
description = st.text_area("Enter a description of your company (if URL is not available):")

# Initialize API keys and tools
if "openai_api_key" in st.session_state and "firecrawl_api_key" in st.session_state:
    if (search_engine == "Perplexity AI - Sonar Pro" and "perplexity_api_key" in st.session_state) or \
       (search_engine == "Exa AI" and "exa_api_key" in st.session_state):
        
        # Initialize Exa only if selected
        if search_engine == "Exa AI":
            exa = Exa(api_key=st.session_state.exa_api_key)

        firecrawl_tools = FirecrawlTools(
            api_key=st.session_state.firecrawl_api_key,
            scrape=False,
            crawl=True,
            limit=5
        )

        firecrawl_agent = Agent(
            model=OpenAIChat(id="gpt-4o", api_key=st.session_state.openai_api_key),
            tools=[firecrawl_tools, DuckDuckGoTools()],
            show_tool_calls=True,
            markdown=True
        )

        analysis_agent = Agent(
            model=OpenAIChat(id="gpt-4o", api_key=st.session_state.openai_api_key),
            show_tool_calls=True,
            markdown=True
        )

        # New agent for comparing competitor data
        comparison_agent = Agent(
            model=OpenAIChat(id="gpt-4o", api_key=st.session_state.openai_api_key),
            show_tool_calls=True,
            markdown=True
        )

        def get_competitor_urls(url: str = None, description: str = None) -> list[str]:
            if not url and not description:
                raise ValueError("Please provide either a URL or a description.")

            if search_engine == "Perplexity AI - Sonar Pro":
                perplexity_url = "https://api.perplexity.ai/chat/completions"
                
                content = "Find me 3 competitor company URLs similar to the company with "
                if url and description:
                    content += f"URL: {url} and description: {description}"
                elif url:
                    content += f"URL: {url}"
                else:
                    content += f"description: {description}"
                content += ". ONLY RESPOND WITH THE URLS, NO OTHER TEXT."

                payload = {
                    "model": "sonar-pro",
                    "messages": [
                        {
                            "role": "system",
                            "content": "Be precise and only return 3 company URLs ONLY."
                        },
                        {
                            "role": "user",
                            "content": content
                        }
                    ],
                    "max_tokens": 1000,
                    "temperature": 0.2,
                }
                
                headers = {
                    "Authorization": f"Bearer {st.session_state.perplexity_api_key}",
                    "Content-Type": "application/json"
                }

                try:
                    response = requests.post(perplexity_url, json=payload, headers=headers)
                    response.raise_for_status()
                    urls = response.json()['choices'][0]['message']['content'].strip().split('\n')
                    return [url.strip() for url in urls if url.strip()]
                except Exception as e:
                    st.error(f"Error fetching competitor URLs from Perplexity: {str(e)}")
                    return []

            else:  # Exa AI
                try:
                    if url:
                        result = exa.find_similar(
                            url=url,
                            num_results=3,
                            exclude_source_domain=True,
                            category="company"
                        )
                    else:
                        result = exa.search(
                            description,
                            type="neural",
                            category="company",
                            use_autoprompt=True,
                            num_results=3
                        )
                    return [item.url for item in result.results]
                except Exception as e:
                    st.error(f"Error fetching competitor URLs from Exa: {str(e)}")
                    return []

        class CompetitorDataSchema(BaseModel):
            company_name: str = Field(description="Name of the company")
            pricing: str = Field(description="Pricing details, tiers, and plans")
            key_features: List[str] = Field(description="Main features and capabilities of the product/service")
            tech_stack: List[str] = Field(description="Technologies, frameworks, and tools used")
            marketing_focus: str = Field(description="Main marketing angles and target audience")
            customer_feedback: str = Field(description="Customer testimonials, reviews, and feedback")

        def extract_competitor_info(competitor_url: str) -> Optional[dict]:
            try:
                # Initialize FirecrawlApp with API key
                app = FirecrawlApp(api_key=st.session_state.firecrawl_api_key)
                
                # Add wildcard to crawl subpages
                url_pattern = f"{competitor_url}/*"
                
                extraction_prompt = """
                Extract detailed information about the company's offerings, including:
                - Company name and basic information
                - Pricing details, plans, and tiers
                - Key features and main capabilities
                - Technology stack and technical details
                - Marketing focus and target audience
                - Customer feedback and testimonials
                
                Analyze the entire website content to provide comprehensive information for each field.
                """
                
                response = app.extract(
                    [url_pattern],
                    {
                        'prompt': extraction_prompt,
                        'schema': CompetitorDataSchema.model_json_schema(),
                    }
                )
                
                if response.get('success') and response.get('data'):
                    extracted_info = response['data']
                    
                    # Create JSON structure
                    competitor_json = {
                        "competitor_url": competitor_url,
                        "company_name": extracted_info.get('company_name', 'N/A'),
                        "pricing": extracted_info.get('pricing', 'N/A'),
                        "key_features": extracted_info.get('key_features', [])[:5],  # Top 5 features
                        "tech_stack": extracted_info.get('tech_stack', [])[:5],      # Top 5 tech stack items
                        "marketing_focus": extracted_info.get('marketing_focus', 'N/A'),
                        "customer_feedback": extracted_info.get('customer_feedback', 'N/A')
                    }
                    
                    return competitor_json
                    
                else:
                    return None
                    
            except Exception as e:
                return None

        def generate_comparison_report(competitor_data: list) -> None:
            # Format the competitor data for the prompt
            formatted_data = json.dumps(competitor_data, indent=2)
            print(formatted_data)
            
            # Updated system prompt for more structured output
            system_prompt = f"""
            As an expert business analyst, analyze the following competitor data in JSON format and create a structured comparison.
            Extract and summarize the key information into concise points.

            {formatted_data}

            Return the data in a structured format with EXACTLY these columns:
            Company, Pricing, Key Features, Tech Stack, Marketing Focus, Customer Feedback

            Rules:
            1. For Company: Include company name and URL
            2. For Key Features: List top 3 most important features only
            3. For Tech Stack: List top 3 most relevant technologies only
            4. Keep all entries clear and concise
            5. Format feedback as brief quotes
            6. Return ONLY the structured data, no additional text
            """

            # Get comparison data from agent
            comparison_response = comparison_agent.run(system_prompt)
            
            try:
                # Split the response into lines and clean them
                table_lines = [
                    line.strip() 
                    for line in comparison_response.content.split('\n') 
                    if line.strip() and '|' in line
                ]
                
                # Extract headers (first row)
                headers = [
                    col.strip() 
                    for col in table_lines[0].split('|') 
                    if col.strip()
                ]
                
                # Extract data rows (skip header and separator rows)
                data_rows = []
                for line in table_lines[2:]:  # Skip header and separator rows
                    row_data = [
                        cell.strip() 
                        for cell in line.split('|') 
                        if cell.strip()
                    ]
                    if len(row_data) == len(headers):
                        data_rows.append(row_data)
                
                # Create DataFrame
                df = pd.DataFrame(
                    data_rows,
                    columns=headers
                )
                
                # Display the table
                st.subheader("Competitor Comparison")
                st.table(df)
                
            except Exception as e:
                st.error(f"Error creating comparison table: {str(e)}")
                st.write("Raw comparison data for debugging:", comparison_response.content)

        def generate_analysis_report(competitor_data: list):
            # Format the competitor data for the prompt
            formatted_data = json.dumps(competitor_data, indent=2)
            print("Analysis Data:", formatted_data)  # For debugging
            
            report = analysis_agent.run(
                f"""Analyze the following competitor data in JSON format and identify market opportunities to improve my own company:
                
                {formatted_data}

                Tasks:
                1. Identify market gaps and opportunities based on competitor offerings
                2. Analyze competitor weaknesses that we can capitalize on
                3. Recommend unique features or capabilities we should develop
                4. Suggest pricing and positioning strategies to gain competitive advantage
                5. Outline specific growth opportunities in underserved market segments
                6. Provide actionable recommendations for product development and go-to-market strategy

                Focus on finding opportunities where we can differentiate and do better than competitors.
                Highlight any unmet customer needs or pain points we can address.
                """
            )
            return report.content

        # Run analysis when the user clicks the button
        if st.button("Analyze Competitors"):
            if url or description:
                with st.spinner("Fetching competitor URLs..."):
                    competitor_urls = get_competitor_urls(url=url, description=description)
                    st.write(f"Competitor URLs: {competitor_urls}")
                
                competitor_data = []
                for comp_url in competitor_urls:
                    with st.spinner(f"Analyzing Competitor: {comp_url}..."):
                        competitor_info = extract_competitor_info(comp_url)
                        if competitor_info is not None:
                            competitor_data.append(competitor_info)
                
                if competitor_data:
                    # Generate and display comparison report
                    with st.spinner("Generating comparison table..."):
                        generate_comparison_report(competitor_data)
                    
                    # Generate and display final analysis report
                    with st.spinner("Generating analysis report..."):
                        analysis_report = generate_analysis_report(competitor_data)
                        st.subheader("Competitor Analysis Report")
                        st.markdown(analysis_report)
                    
                    st.success("Analysis complete!")
                else:
                    st.error("Could not extract data from any competitor URLs")
            else:
                st.error("Please provide either a URL or a description.")import streamlit as st
from exa_py import Exa
from agno.agent import Agent
from agno.tools.firecrawl import FirecrawlTools
from agno.models.openai import OpenAIChat
from agno.tools.duckduckgo import DuckDuckGoTools
import pandas as pd
import requests
from firecrawl import FirecrawlApp
from pydantic import BaseModel, Field
from typing import List, Optional
import json

# Streamlit UI
st.set_page_config(page_title="AI Competitor Intelligence Agent Team", layout="wide")

# Sidebar for API keys
st.sidebar.title("API Keys")
openai_api_key = st.sidebar.text_input("OpenAI API Key", type="password")
firecrawl_api_key = st.sidebar.text_input("Firecrawl API Key", type="password")

# Add search engine selection before API keys
search_engine = st.sidebar.selectbox(
    "Select Search Endpoint",
    options=["Perplexity AI - Sonar Pro", "Exa AI"],
    help="Choose which AI service to use for finding competitor URLs"
)

# Show relevant API key input based on selection
if search_engine == "Perplexity AI - Sonar Pro":
    perplexity_api_key = st.sidebar.text_input("Perplexity API Key", type="password")
    # Store API keys in session state
    if openai_api_key and firecrawl_api_key and perplexity_api_key:
        st.session_state.openai_api_key = openai_api_key
        st.session_state.firecrawl_api_key = firecrawl_api_key
        st.session_state.perplexity_api_key = perplexity_api_key
    else:
        st.sidebar.warning("Please enter all required API keys to proceed.")
else:  # Exa AI
    exa_api_key = st.sidebar.text_input("Exa API Key", type="password")
    # Store API keys in session state
    if openai_api_key and firecrawl_api_key and exa_api_key:
        st.session_state.openai_api_key = openai_api_key
        st.session_state.firecrawl_api_key = firecrawl_api_key
        st.session_state.exa_api_key = exa_api_key
    else:
        st.sidebar.warning("Please enter all required API keys to proceed.")

# Main UI
st.title("🧲 AI Competitor Intelligence Agent Team")
st.info(
    """
    This app helps businesses analyze their competitors by extracting structured data from competitor websites and generating insights using AI.
    - Provide a **URL** or a **description** of your company.
    - The app will fetch competitor URLs, extract relevant information, and generate a detailed analysis report.
    """
)
st.success("For better results, provide both URL and a 5-6 word description of your company!")

# Input fields for URL and description
url = st.text_input("Enter your company URL :")
description = st.text_area("Enter a description of your company (if URL is not available):")

# Initialize API keys and tools
if "openai_api_key" in st.session_state and "firecrawl_api_key" in st.session_state:
    if (search_engine == "Perplexity AI - Sonar Pro" and "perplexity_api_key" in st.session_state) or \
       (search_engine == "Exa AI" and "exa_api_key" in st.session_state):
        
        # Initialize Exa only if selected
        if search_engine == "Exa AI":
            exa = Exa(api_key=st.session_state.exa_api_key)

        firecrawl_tools = FirecrawlTools(
            api_key=st.session_state.firecrawl_api_key,
            scrape=False,
            crawl=True,
            limit=5
        )

        firecrawl_agent = Agent(
            model=OpenAIChat(id="gpt-4o", api_key=st.session_state.openai_api_key),
            tools=[firecrawl_tools, DuckDuckGoTools()],
            show_tool_calls=True,
            markdown=True
        )

        analysis_agent = Agent(
            model=OpenAIChat(id="gpt-4o", api_key=st.session_state.openai_api_key),
            show_tool_calls=True,
            markdown=True
        )

        # New agent for comparing competitor data
        comparison_agent = Agent(
            model=OpenAIChat(id="gpt-4o", api_key=st.session_state.openai_api_key),
            show_tool_calls=True,
            markdown=True
        )

        def get_competitor_urls(url: str = None, description: str = None) -> list[str]:
            if not url and not description:
                raise ValueError("Please provide either a URL or a description.")

            if search_engine == "Perplexity AI - Sonar Pro":
                perplexity_url = "https://api.perplexity.ai/chat/completions"
                
                content = "Find me 3 competitor company URLs similar to the company with "
                if url and description:
                    content += f"URL: {url} and description: {description}"
                elif url:
                    content += f"URL: {url}"
                else:
                    content += f"description: {description}"
                content += ". ONLY RESPOND WITH THE URLS, NO OTHER TEXT."

                payload = {
                    "model": "sonar-pro",
                    "messages": [
                        {
                            "role": "system",
                            "content": "Be precise and only return 3 company URLs ONLY."
                        },
                        {
                            "role": "user",
                            "content": content
                        }
                    ],
                    "max_tokens": 1000,
                    "temperature": 0.2,
                }
                
                headers = {
                    "Authorization": f"Bearer {st.session_state.perplexity_api_key}",
                    "Content-Type": "application/json"
                }

                try:
                    response = requests.post(perplexity_url, json=payload, headers=headers)
                    response.raise_for_status()
                    urls = response.json()['choices'][0]['message']['content'].strip().split('\n')
                    return [url.strip() for url in urls if url.strip()]
                except Exception as e:
                    st.error(f"Error fetching competitor URLs from Perplexity: {str(e)}")
                    return []

            else:  # Exa AI
                try:
                    if url:
                        result = exa.find_similar(
                            url=url,
                            num_results=3,
                            exclude_source_domain=True,
                            category="company"
                        )
                    else:
                        result = exa.search(
                            description,
                            type="neural",
                            category="company",
                            use_autoprompt=True,
                            num_results=3
                        )
                    return [item.url for item in result.results]
                except Exception as e:
                    st.error(f"Error fetching competitor URLs from Exa: {str(e)}")
                    return []

        class CompetitorDataSchema(BaseModel):
            company_name: str = Field(description="Name of the company")
            pricing: str = Field(description="Pricing details, tiers, and plans")
            key_features: List[str] = Field(description="Main features and capabilities of the product/service")
            tech_stack: List[str] = Field(description="Technologies, frameworks, and tools used")
            marketing_focus: str = Field(description="Main marketing angles and target audience")
            customer_feedback: str = Field(description="Customer testimonials, reviews, and feedback")

        def extract_competitor_info(competitor_url: str) -> Optional[dict]:
            try:
                # Initialize FirecrawlApp with API key
                app = FirecrawlApp(api_key=st.session_state.firecrawl_api_key)
                
                # Add wildcard to crawl subpages
                url_pattern = f"{competitor_url}/*"
                
                extraction_prompt = """
                Extract detailed information about the company's offerings, including:
                - Company name and basic information
                - Pricing details, plans, and tiers
                - Key features and main capabilities
                - Technology stack and technical details
                - Marketing focus and target audience
                - Customer feedback and testimonials
                
                Analyze the entire website content to provide comprehensive information for each field.
                """
                
                response = app.extract(
                    [url_pattern],
                    {
                        'prompt': extraction_prompt,
                        'schema': CompetitorDataSchema.model_json_schema(),
                    }
                )
                
                if response.get('success') and response.get('data'):
                    extracted_info = response['data']
                    
                    # Create JSON structure
                    competitor_json = {
                        "competitor_url": competitor_url,
                        "company_name": extracted_info.get('company_name', 'N/A'),
                        "pricing": extracted_info.get('pricing', 'N/A'),
                        "key_features": extracted_info.get('key_features', [])[:5],  # Top 5 features
                        "tech_stack": extracted_info.get('tech_stack', [])[:5],      # Top 5 tech stack items
                        "marketing_focus": extracted_info.get('marketing_focus', 'N/A'),
                        "customer_feedback": extracted_info.get('customer_feedback', 'N/A')
                    }
                    
                    return competitor_json
                    
                else:
                    return None
                    
            except Exception as e:
                return None

        def generate_comparison_report(competitor_data: list) -> None:
            # Format the competitor data for the prompt
            formatted_data = json.dumps(competitor_data, indent=2)
            print(formatted_data)
            
            # Updated system prompt for more structured output
            system_prompt = f"""
            As an expert business analyst, analyze the following competitor data in JSON format and create a structured comparison.
            Extract and summarize the key information into concise points.

            {formatted_data}

            Return the data in a structured format with EXACTLY these columns:
            Company, Pricing, Key Features, Tech Stack, Marketing Focus, Customer Feedback

            Rules:
            1. For Company: Include company name and URL
            2. For Key Features: List top 3 most important features only
            3. For Tech Stack: List top 3 most relevant technologies only
            4. Keep all entries clear and concise
            5. Format feedback as brief quotes
            6. Return ONLY the structured data, no additional text
            """

            # Get comparison data from agent
            comparison_response = comparison_agent.run(system_prompt)
            
            try:
                # Split the response into lines and clean them
                table_lines = [
                    line.strip() 
                    for line in comparison_response.content.split('\n') 
                    if line.strip() and '|' in line
                ]
                
                # Extract headers (first row)
                headers = [
                    col.strip() 
                    for col in table_lines[0].split('|') 
                    if col.strip()
                ]
                
                # Extract data rows (skip header and separator rows)
                data_rows = []
                for line in table_lines[2:]:  # Skip header and separator rows
                    row_data = [
                        cell.strip() 
                        for cell in line.split('|') 
                        if cell.strip()
                    ]
                    if len(row_data) == len(headers):
                        data_rows.append(row_data)
                
                # Create DataFrame
                df = pd.DataFrame(
                    data_rows,
                    columns=headers
                )
                
                # Display the table
                st.subheader("Competitor Comparison")
                st.table(df)
                
            except Exception as e:
                st.error(f"Error creating comparison table: {str(e)}")
                st.write("Raw comparison data for debugging:", comparison_response.content)

        def generate_analysis_report(competitor_data: list):
            # Format the competitor data for the prompt
            formatted_data = json.dumps(competitor_data, indent=2)
            print("Analysis Data:", formatted_data)  # For debugging
            
            report = analysis_agent.run(
                f"""Analyze the following competitor data in JSON format and identify market opportunities to improve my own company:
                
                {formatted_data}

                Tasks:
                1. Identify market gaps and opportunities based on competitor offerings
                2. Analyze competitor weaknesses that we can capitalize on
                3. Recommend unique features or capabilities we should develop
                4. Suggest pricing and positioning strategies to gain competitive advantage
                5. Outline specific growth opportunities in underserved market segments
                6. Provide actionable recommendations for product development and go-to-market strategy

                Focus on finding opportunities where we can differentiate and do better than competitors.
                Highlight any unmet customer needs or pain points we can address.
                """
            )
            return report.content

        # Run analysis when the user clicks the button
        if st.button("Analyze Competitors"):
            if url or description:
                with st.spinner("Fetching competitor URLs..."):
                    competitor_urls = get_competitor_urls(url=url, description=description)
                    st.write(f"Competitor URLs: {competitor_urls}")
                
                competitor_data = []
                for comp_url in competitor_urls:
                    with st.spinner(f"Analyzing Competitor: {comp_url}..."):
                        competitor_info = extract_competitor_info(comp_url)
                        if competitor_info is not None:
                            competitor_data.append(competitor_info)
                
                if competitor_data:
                    # Generate and display comparison report
                    with st.spinner("Generating comparison table..."):
                        generate_comparison_report(competitor_data)
                    
                    # Generate and display final analysis report
                    with st.spinner("Generating analysis report..."):
                        analysis_report = generate_analysis_report(competitor_data)
                        st.subheader("Competitor Analysis Report")
                        st.markdown(analysis_report)
                    
                    st.success("Analysis complete!")
                else:
                    st.error("Could not extract data from any competitor URLs")
            else:
                st.error("Please provide either a URL or a description.")import streamlit as st
from exa_py import Exa
from agno.agent import Agent
from agno.tools.firecrawl import FirecrawlTools
from agno.models.openai import OpenAIChat
from agno.tools.duckduckgo import DuckDuckGoTools
import pandas as pd
import requests
from firecrawl import FirecrawlApp
from pydantic import BaseModel, Field
from typing import List, Optional
import json

# Streamlit UI
st.set_page_config(page_title="AI Competitor Intelligence Agent Team", layout="wide")

# Sidebar for API keys
st.sidebar.title("API Keys")
openai_api_key = st.sidebar.text_input("OpenAI API Key", type="password")
firecrawl_api_key = st.sidebar.text_input("Firecrawl API Key", type="password")

# Add search engine selection before API keys
search_engine = st.sidebar.selectbox(
    "Select Search Endpoint",
    options=["Perplexity AI - Sonar Pro", "Exa AI"],
    help="Choose which AI service to use for finding competitor URLs"
)

# Show relevant API key input based on selection
if search_engine == "Perplexity AI - Sonar Pro":
    perplexity_api_key = st.sidebar.text_input("Perplexity API Key", type="password")
    # Store API keys in session state
    if openai_api_key and firecrawl_api_key and perplexity_api_key:
        st.session_state.openai_api_key = openai_api_key
        st.session_state.firecrawl_api_key = firecrawl_api_key
        st.session_state.perplexity_api_key = perplexity_api_key
    else:
        st.sidebar.warning("Please enter all required API keys to proceed.")
else:  # Exa AI
    exa_api_key = st.sidebar.text_input("Exa API Key", type="password")
    # Store API keys in session state
    if openai_api_key and firecrawl_api_key and exa_api_key:
        st.session_state.openai_api_key = openai_api_key
        st.session_state.firecrawl_api_key = firecrawl_api_key
        st.session_state.exa_api_key = exa_api_key
    else:
        st.sidebar.warning("Please enter all required API keys to proceed.")

# Main UI
st.title("🧲 AI Competitor Intelligence Agent Team")
st.info(
    """
    This app helps businesses analyze their competitors by extracting structured data from competitor websites and generating insights using AI.
    - Provide a **URL** or a **description** of your company.
    - The app will fetch competitor URLs, extract relevant information, and generate a detailed analysis report.
    """
)
st.success("For better results, provide both URL and a 5-6 word description of your company!")

# Input fields for URL and description
url = st.text_input("Enter your company URL :")
description = st.text_area("Enter a description of your company (if URL is not available):")

# Initialize API keys and tools
if "openai_api_key" in st.session_state and "firecrawl_api_key" in st.session_state:
    if (search_engine == "Perplexity AI - Sonar Pro" and "perplexity_api_key" in st.session_state) or \
       (search_engine == "Exa AI" and "exa_api_key" in st.session_state):
        
        # Initialize Exa only if selected
        if search_engine == "Exa AI":
            exa = Exa(api_key=st.session_state.exa_api_key)

        firecrawl_tools = FirecrawlTools(
            api_key=st.session_state.firecrawl_api_key,
            scrape=False,
            crawl=True,
            limit=5
        )

        firecrawl_agent = Agent(
            model=OpenAIChat(id="gpt-4o", api_key=st.session_state.openai_api_key),
            tools=[firecrawl_tools, DuckDuckGoTools()],
            show_tool_calls=True,
            markdown=True
        )

        analysis_agent = Agent(
            model=OpenAIChat(id="gpt-4o", api_key=st.session_state.openai_api_key),
            show_tool_calls=True,
            markdown=True
        )

        # New agent for comparing competitor data
        comparison_agent = Agent(
            model=OpenAIChat(id="gpt-4o", api_key=st.session_state.openai_api_key),
            show_tool_calls=True,
            markdown=True
        )

        def get_competitor_urls(url: str = None, description: str = None) -> list[str]:
            if not url and not description:
                raise ValueError("Please provide either a URL or a description.")

            if search_engine == "Perplexity AI - Sonar Pro":
                perplexity_url = "https://api.perplexity.ai/chat/completions"
                
                content = "Find me 3 competitor company URLs similar to the company with "
                if url and description:
                    content += f"URL: {url} and description: {description}"
                elif url:
                    content += f"URL: {url}"
                else:
                    content += f"description: {description}"
                content += ". ONLY RESPOND WITH THE URLS, NO OTHER TEXT."

                payload = {
                    "model": "sonar-pro",
                    "messages": [
                        {
                            "role": "system",
                            "content": "Be precise and only return 3 company URLs ONLY."
                        },
                        {
                            "role": "user",
                            "content": content
                        }
                    ],
                    "max_tokens": 1000,
                    "temperature": 0.2,
                }
                
                headers = {
                    "Authorization": f"Bearer {st.session_state.perplexity_api_key}",
                    "Content-Type": "application/json"
                }

                try:
                    response = requests.post(perplexity_url, json=payload, headers=headers)
                    response.raise_for_status()
                    urls = response.json()['choices'][0]['message']['content'].strip().split('\n')
                    return [url.strip() for url in urls if url.strip()]
                except Exception as e:
                    st.error(f"Error fetching competitor URLs from Perplexity: {str(e)}")
                    return []

            else:  # Exa AI
                try:
                    if url:
                        result = exa.find_similar(
                            url=url,
                            num_results=3,
                            exclude_source_domain=True,
                            category="company"
                        )
                    else:
                        result = exa.search(
                            description,
                            type="neural",
                            category="company",
                            use_autoprompt=True,
                            num_results=3
                        )
                    return [item.url for item in result.results]
                except Exception as e:
                    st.error(f"Error fetching competitor URLs from Exa: {str(e)}")
                    return []

        class CompetitorDataSchema(BaseModel):
            company_name: str = Field(description="Name of the company")
            pricing: str = Field(description="Pricing details, tiers, and plans")
            key_features: List[str] = Field(description="Main features and capabilities of the product/service")
            tech_stack: List[str] = Field(description="Technologies, frameworks, and tools used")
            marketing_focus: str = Field(description="Main marketing angles and target audience")
            customer_feedback: str = Field(description="Customer testimonials, reviews, and feedback")

        def extract_competitor_info(competitor_url: str) -> Optional[dict]:
            try:
                # Initialize FirecrawlApp with API key
                app = FirecrawlApp(api_key=st.session_state.firecrawl_api_key)
                
                # Add wildcard to crawl subpages
                url_pattern = f"{competitor_url}/*"
                
                extraction_prompt = """
                Extract detailed information about the company's offerings, including:
                - Company name and basic information
                - Pricing details, plans, and tiers
                - Key features and main capabilities
                - Technology stack and technical details
                - Marketing focus and target audience
                - Customer feedback and testimonials
                
                Analyze the entire website content to provide comprehensive information for each field.
                """
                
                response = app.extract(
                    [url_pattern],
                    {
                        'prompt': extraction_prompt,
                        'schema': CompetitorDataSchema.model_json_schema(),
                    }
                )
                
                if response.get('success') and response.get('data'):
                    extracted_info = response['data']
                    
                    # Create JSON structure
                    competitor_json = {
                        "competitor_url": competitor_url,
                        "company_name": extracted_info.get('company_name', 'N/A'),
                        "pricing": extracted_info.get('pricing', 'N/A'),
                        "key_features": extracted_info.get('key_features', [])[:5],  # Top 5 features
                        "tech_stack": extracted_info.get('tech_stack', [])[:5],      # Top 5 tech stack items
                        "marketing_focus": extracted_info.get('marketing_focus', 'N/A'),
                        "customer_feedback": extracted_info.get('customer_feedback', 'N/A')
                    }
                    
                    return competitor_json
                    
                else:
                    return None
                    
            except Exception as e:
                return None

        def generate_comparison_report(competitor_data: list) -> None:
            # Format the competitor data for the prompt
            formatted_data = json.dumps(competitor_data, indent=2)
            print(formatted_data)
            
            # Updated system prompt for more structured output
            system_prompt = f"""
            As an expert business analyst, analyze the following competitor data in JSON format and create a structured comparison.
            Extract and summarize the key information into concise points.

            {formatted_data}

            Return the data in a structured format with EXACTLY these columns:
            Company, Pricing, Key Features, Tech Stack, Marketing Focus, Customer Feedback

            Rules:
            1. For Company: Include company name and URL
            2. For Key Features: List top 3 most important features only
            3. For Tech Stack: List top 3 most relevant technologies only
            4. Keep all entries clear and concise
            5. Format feedback as brief quotes
            6. Return ONLY the structured data, no additional text
            """

            # Get comparison data from agent
            comparison_response = comparison_agent.run(system_prompt)
            
            try:
                # Split the response into lines and clean them
                table_lines = [
                    line.strip() 
                    for line in comparison_response.content.split('\n') 
                    if line.strip() and '|' in line
                ]
                
                # Extract headers (first row)
                headers = [
                    col.strip() 
                    for col in table_lines[0].split('|') 
                    if col.strip()
                ]
                
                # Extract data rows (skip header and separator rows)
                data_rows = []
                for line in table_lines[2:]:  # Skip header and separator rows
                    row_data = [
                        cell.strip() 
                        for cell in line.split('|') 
                        if cell.strip()
                    ]
                    if len(row_data) == len(headers):
                        data_rows.append(row_data)
                
                # Create DataFrame
                df = pd.DataFrame(
                    data_rows,
                    columns=headers
                )
                
                # Display the table
                st.subheader("Competitor Comparison")
                st.table(df)
                
            except Exception as e:
                st.error(f"Error creating comparison table: {str(e)}")
                st.write("Raw comparison data for debugging:", comparison_response.content)

        def generate_analysis_report(competitor_data: list):
            # Format the competitor data for the prompt
            formatted_data = json.dumps(competitor_data, indent=2)
            print("Analysis Data:", formatted_data)  # For debugging
            
            report = analysis_agent.run(
                f"""Analyze the following competitor data in JSON format and identify market opportunities to improve my own company:
                
                {formatted_data}

                Tasks:
                1. Identify market gaps and opportunities based on competitor offerings
                2. Analyze competitor weaknesses that we can capitalize on
                3. Recommend unique features or capabilities we should develop
                4. Suggest pricing and positioning strategies to gain competitive advantage
                5. Outline specific growth opportunities in underserved market segments
                6. Provide actionable recommendations for product development and go-to-market strategy

                Focus on finding opportunities where we can differentiate and do better than competitors.
                Highlight any unmet customer needs or pain points we can address.
                """
            )
            return report.content

        # Run analysis when the user clicks the button
        if st.button("Analyze Competitors"):
            if url or description:
                with st.spinner("Fetching competitor URLs..."):
                    competitor_urls = get_competitor_urls(url=url, description=description)
                    st.write(f"Competitor URLs: {competitor_urls}")
                
                competitor_data = []
                for comp_url in competitor_urls:
                    with st.spinner(f"Analyzing Competitor: {comp_url}..."):
                        competitor_info = extract_competitor_info(comp_url)
                        if competitor_info is not None:
                            competitor_data.append(competitor_info)
                
                if competitor_data:
                    # Generate and display comparison report
                    with st.spinner("Generating comparison table..."):
                        generate_comparison_report(competitor_data)
                    
                    # Generate and display final analysis report
                    with st.spinner("Generating analysis report..."):
                        analysis_report = generate_analysis_report(competitor_data)
                        st.subheader("Competitor Analysis Report")
                        st.markdown(analysis_report)
                    
                    st.success("Analysis complete!")
                else:
                    st.error("Could not extract data from any competitor URLs")
            else:
                st.error("Please provide either a URL or a description.")import streamlit as st
from exa_py import Exa
from agno.agent import Agent
from agno.tools.firecrawl import FirecrawlTools
from agno.models.openai import OpenAIChat
from agno.tools.duckduckgo import DuckDuckGoTools
import pandas as pd
import requests
from firecrawl import FirecrawlApp
from pydantic import BaseModel, Field
from typing import List, Optional
import json

# Streamlit UI
st.set_page_config(page_title="AI Competitor Intelligence Agent Team", layout="wide")

# Sidebar for API keys
st.sidebar.title("API Keys")
openai_api_key = st.sidebar.text_input("OpenAI API Key", type="password")
firecrawl_api_key = st.sidebar.text_input("Firecrawl API Key", type="password")

# Add search engine selection before API keys
search_engine = st.sidebar.selectbox(
    "Select Search Endpoint",
    options=["Perplexity AI - Sonar Pro", "Exa AI"],
    help="Choose which AI service to use for finding competitor URLs"
)

# Show relevant API key input based on selection
if search_engine == "Perplexity AI - Sonar Pro":
    perplexity_api_key = st.sidebar.text_input("Perplexity API Key", type="password")
    # Store API keys in session state
    if openai_api_key and firecrawl_api_key and perplexity_api_key:
        st.session_state.openai_api_key = openai_api_key
        st.session_state.firecrawl_api_key = firecrawl_api_key
        st.session_state.perplexity_api_key = perplexity_api_key
    else:
        st.sidebar.warning("Please enter all required API keys to proceed.")
else:  # Exa AI
    exa_api_key = st.sidebar.text_input("Exa API Key", type="password")
    # Store API keys in session state
    if openai_api_key and firecrawl_api_key and exa_api_key:
        st.session_state.openai_api_key = openai_api_key
        st.session_state.firecrawl_api_key = firecrawl_api_key
        st.session_state.exa_api_key = exa_api_key
    else:
        st.sidebar.warning("Please enter all required API keys to proceed.")

# Main UI
st.title("🧲 AI Competitor Intelligence Agent Team")
st.info(
    """
    This app helps businesses analyze their competitors by extracting structured data from competitor websites and generating insights using AI.
    - Provide a **URL** or a **description** of your company.
    - The app will fetch competitor URLs, extract relevant information, and generate a detailed analysis report.
    """
)
st.success("For better results, provide both URL and a 5-6 word description of your company!")

# Input fields for URL and description
url = st.text_input("Enter your company URL :")
description = st.text_area("Enter a description of your company (if URL is not available):")

# Initialize API keys and tools
if "openai_api_key" in st.session_state and "firecrawl_api_key" in st.session_state:
    if (search_engine == "Perplexity AI - Sonar Pro" and "perplexity_api_key" in st.session_state) or \
       (search_engine == "Exa AI" and "exa_api_key" in st.session_state):
        
        # Initialize Exa only if selected
        if search_engine == "Exa AI":
            exa = Exa(api_key=st.session_state.exa_api_key)

        firecrawl_tools = FirecrawlTools(
            api_key=st.session_state.firecrawl_api_key,
            scrape=False,
            crawl=True,
            limit=5
        )

        firecrawl_agent = Agent(
            model=OpenAIChat(id="gpt-4o", api_key=st.session_state.openai_api_key),
            tools=[firecrawl_tools, DuckDuckGoTools()],
            show_tool_calls=True,
            markdown=True
        )

        analysis_agent = Agent(
            model=OpenAIChat(id="gpt-4o", api_key=st.session_state.openai_api_key),
            show_tool_calls=True,
            markdown=True
        )

        # New agent for comparing competitor data
        comparison_agent = Agent(
            model=OpenAIChat(id="gpt-4o", api_key=st.session_state.openai_api_key),
            show_tool_calls=True,
            markdown=True
        )

        def get_competitor_urls(url: str = None, description: str = None) -> list[str]:
            if not url and not description:
                raise ValueError("Please provide either a URL or a description.")

            if search_engine == "Perplexity AI - Sonar Pro":
                perplexity_url = "https://api.perplexity.ai/chat/completions"
                
                content = "Find me 3 competitor company URLs similar to the company with "
                if url and description:
                    content += f"URL: {url} and description: {description}"
                elif url:
                    content += f"URL: {url}"
                else:
                    content += f"description: {description}"
                content += ". ONLY RESPOND WITH THE URLS, NO OTHER TEXT."

                payload = {
                    "model": "sonar-pro",
                    "messages": [
                        {
                            "role": "system",
                            "content": "Be precise and only return 3 company URLs ONLY."
                        },
                        {
                            "role": "user",
                            "content": content
                        }
                    ],
                    "max_tokens": 1000,
                    "temperature": 0.2,
                }
                
                headers = {
                    "Authorization": f"Bearer {st.session_state.perplexity_api_key}",
                    "Content-Type": "application/json"
                }

                try:
                    response = requests.post(perplexity_url, json=payload, headers=headers)
                    response.raise_for_status()
                    urls = response.json()['choices'][0]['message']['content'].strip().split('\n')
                    return [url.strip() for url in urls if url.strip()]
                except Exception as e:
                    st.error(f"Error fetching competitor URLs from Perplexity: {str(e)}")
                    return []

            else:  # Exa AI
                try:
                    if url:
                        result = exa.find_similar(
                            url=url,
                            num_results=3,
                            exclude_source_domain=True,
                            category="company"
                        )
                    else:
                        result = exa.search(
                            description,
                            type="neural",
                            category="company",
                            use_autoprompt=True,
                            num_results=3
                        )
                    return [item.url for item in result.results]
                except Exception as e:
                    st.error(f"Error fetching competitor URLs from Exa: {str(e)}")
                    return []

        class CompetitorDataSchema(BaseModel):
            company_name: str = Field(description="Name of the company")
            pricing: str = Field(description="Pricing details, tiers, and plans")
            key_features: List[str] = Field(description="Main features and capabilities of the product/service")
            tech_stack: List[str] = Field(description="Technologies, frameworks, and tools used")
            marketing_focus: str = Field(description="Main marketing angles and target audience")
            customer_feedback: str = Field(description="Customer testimonials, reviews, and feedback")

        def extract_competitor_info(competitor_url: str) -> Optional[dict]:
            try:
                # Initialize FirecrawlApp with API key
                app = FirecrawlApp(api_key=st.session_state.firecrawl_api_key)
                
                # Add wildcard to crawl subpages
                url_pattern = f"{competitor_url}/*"
                
                extraction_prompt = """
                Extract detailed information about the company's offerings, including:
                - Company name and basic information
                - Pricing details, plans, and tiers
                - Key features and main capabilities
                - Technology stack and technical details
                - Marketing focus and target audience
                - Customer feedback and testimonials
                
                Analyze the entire website content to provide comprehensive information for each field.
                """
                
                response = app.extract(
                    [url_pattern],
                    {
                        'prompt': extraction_prompt,
                        'schema': CompetitorDataSchema.model_json_schema(),
                    }
                )
                
                if response.get('success') and response.get('data'):
                    extracted_info = response['data']
                    
                    # Create JSON structure
                    competitor_json = {
                        "competitor_url": competitor_url,
                        "company_name": extracted_info.get('company_name', 'N/A'),
                        "pricing": extracted_info.get('pricing', 'N/A'),
                        "key_features": extracted_info.get('key_features', [])[:5],  # Top 5 features
                        "tech_stack": extracted_info.get('tech_stack', [])[:5],      # Top 5 tech stack items
                        "marketing_focus": extracted_info.get('marketing_focus', 'N/A'),
                        "customer_feedback": extracted_info.get('customer_feedback', 'N/A')
                    }
                    
                    return competitor_json
                    
                else:
                    return None
                    
            except Exception as e:
                return None

        def generate_comparison_report(competitor_data: list) -> None:
            # Format the competitor data for the prompt
            formatted_data = json.dumps(competitor_data, indent=2)
            print(formatted_data)
            
            # Updated system prompt for more structured output
            system_prompt = f"""
            As an expert business analyst, analyze the following competitor data in JSON format and create a structured comparison.
            Extract and summarize the key information into concise points.

            {formatted_data}

            Return the data in a structured format with EXACTLY these columns:
            Company, Pricing, Key Features, Tech Stack, Marketing Focus, Customer Feedback

            Rules:
            1. For Company: Include company name and URL
            2. For Key Features: List top 3 most important features only
            3. For Tech Stack: List top 3 most relevant technologies only
            4. Keep all entries clear and concise
            5. Format feedback as brief quotes
            6. Return ONLY the structured data, no additional text
            """

            # Get comparison data from agent
            comparison_response = comparison_agent.run(system_prompt)
            
            try:
                # Split the response into lines and clean them
                table_lines = [
                    line.strip() 
                    for line in comparison_response.content.split('\n') 
                    if line.strip() and '|' in line
                ]
                
                # Extract headers (first row)
                headers = [
                    col.strip() 
                    for col in table_lines[0].split('|') 
                    if col.strip()
                ]
                
                # Extract data rows (skip header and separator rows)
                data_rows = []
                for line in table_lines[2:]:  # Skip header and separator rows
                    row_data = [
                        cell.strip() 
                        for cell in line.split('|') 
                        if cell.strip()
                    ]
                    if len(row_data) == len(headers):
                        data_rows.append(row_data)
                
                # Create DataFrame
                df = pd.DataFrame(
                    data_rows,
                    columns=headers
                )
                
                # Display the table
                st.subheader("Competitor Comparison")
                st.table(df)
                
            except Exception as e:
                st.error(f"Error creating comparison table: {str(e)}")
                st.write("Raw comparison data for debugging:", comparison_response.content)

        def generate_analysis_report(competitor_data: list):
            # Format the competitor data for the prompt
            formatted_data = json.dumps(competitor_data, indent=2)
            print("Analysis Data:", formatted_data)  # For debugging
            
            report = analysis_agent.run(
                f"""Analyze the following competitor data in JSON format and identify market opportunities to improve my own company:
                
                {formatted_data}

                Tasks:
                1. Identify market gaps and opportunities based on competitor offerings
                2. Analyze competitor weaknesses that we can capitalize on
                3. Recommend unique features or capabilities we should develop
                4. Suggest pricing and positioning strategies to gain competitive advantage
                5. Outline specific growth opportunities in underserved market segments
                6. Provide actionable recommendations for product development and go-to-market strategy

                Focus on finding opportunities where we can differentiate and do better than competitors.
                Highlight any unmet customer needs or pain points we can address.
                """
            )
            return report.content

        # Run analysis when the user clicks the button
        if st.button("Analyze Competitors"):
            if url or description:
                with st.spinner("Fetching competitor URLs..."):
                    competitor_urls = get_competitor_urls(url=url, description=description)
                    st.write(f"Competitor URLs: {competitor_urls}")
                
                competitor_data = []
                for comp_url in competitor_urls:
                    with st.spinner(f"Analyzing Competitor: {comp_url}..."):
                        competitor_info = extract_competitor_info(comp_url)
                        if competitor_info is not None:
                            competitor_data.append(competitor_info)
                
                if competitor_data:
                    # Generate and display comparison report
                    with st.spinner("Generating comparison table..."):
                        generate_comparison_report(competitor_data)
                    
                    # Generate and display final analysis report
                    with st.spinner("Generating analysis report..."):
                        analysis_report = generate_analysis_report(competitor_data)
                        st.subheader("Competitor Analysis Report")
                        st.markdown(analysis_report)
                    
                    st.success("Analysis complete!")
                else:
                    st.error("Could not extract data from any competitor URLs")
            else:
                st.error("Please provide either a URL or a description.")import streamlit as st
from exa_py import Exa
from agno.agent import Agent
from agno.tools.firecrawl import FirecrawlTools
from agno.models.openai import OpenAIChat
from agno.tools.duckduckgo import DuckDuckGoTools
import pandas as pd
import requests
from firecrawl import FirecrawlApp
from pydantic import BaseModel, Field
from typing import List, Optional
import json

# Streamlit UI
st.set_page_config(page_title="AI Competitor Intelligence Agent Team", layout="wide")

# Sidebar for API keys
st.sidebar.title("API Keys")
openai_api_key = st.sidebar.text_input("OpenAI API Key", type="password")
firecrawl_api_key = st.sidebar.text_input("Firecrawl API Key", type="password")

# Add search engine selection before API keys
search_engine = st.sidebar.selectbox(
    "Select Search Endpoint",
    options=["Perplexity AI - Sonar Pro", "Exa AI"],
    help="Choose which AI service to use for finding competitor URLs"
)

# Show relevant API key input based on selection
if search_engine == "Perplexity AI - Sonar Pro":
    perplexity_api_key = st.sidebar.text_input("Perplexity API Key", type="password")
    # Store API keys in session state
    if openai_api_key and firecrawl_api_key and perplexity_api_key:
        st.session_state.openai_api_key = openai_api_key
        st.session_state.firecrawl_api_key = firecrawl_api_key
        st.session_state.perplexity_api_key = perplexity_api_key
    else:
        st.sidebar.warning("Please enter all required API keys to proceed.")
else:  # Exa AI
    exa_api_key = st.sidebar.text_input("Exa API Key", type="password")
    # Store API keys in session state
    if openai_api_key and firecrawl_api_key and exa_api_key:
        st.session_state.openai_api_key = openai_api_key
        st.session_state.firecrawl_api_key = firecrawl_api_key
        st.session_state.exa_api_key = exa_api_key
    else:
        st.sidebar.warning("Please enter all required API keys to proceed.")

# Main UI
st.title("🧲 AI Competitor Intelligence Agent Team")
st.info(
    """
    This app helps businesses analyze their competitors by extracting structured data from competitor websites and generating insights using AI.
    - Provide a **URL** or a **description** of your company.
    - The app will fetch competitor URLs, extract relevant information, and generate a detailed analysis report.
    """
)
st.success("For better results, provide both URL and a 5-6 word description of your company!")

# Input fields for URL and description
url = st.text_input("Enter your company URL :")
description = st.text_area("Enter a description of your company (if URL is not available):")

# Initialize API keys and tools
if "openai_api_key" in st.session_state and "firecrawl_api_key" in st.session_state:
    if (search_engine == "Perplexity AI - Sonar Pro" and "perplexity_api_key" in st.session_state) or \
       (search_engine == "Exa AI" and "exa_api_key" in st.session_state):
        
        # Initialize Exa only if selected
        if search_engine == "Exa AI":
            exa = Exa(api_key=st.session_state.exa_api_key)

        firecrawl_tools = FirecrawlTools(
            api_key=st.session_state.firecrawl_api_key,
            scrape=False,
            crawl=True,
            limit=5
        )

        firecrawl_agent = Agent(
            model=OpenAIChat(id="gpt-4o", api_key=st.session_state.openai_api_key),
            tools=[firecrawl_tools, DuckDuckGoTools()],
            show_tool_calls=True,
            markdown=True
        )

        analysis_agent = Agent(
            model=OpenAIChat(id="gpt-4o", api_key=st.session_state.openai_api_key),
            show_tool_calls=True,
            markdown=True
        )

        # New agent for comparing competitor data
        comparison_agent = Agent(
            model=OpenAIChat(id="gpt-4o", api_key=st.session_state.openai_api_key),
            show_tool_calls=True,
            markdown=True
        )

        def get_competitor_urls(url: str = None, description: str = None) -> list[str]:
            if not url and not description:
                raise ValueError("Please provide either a URL or a description.")

            if search_engine == "Perplexity AI - Sonar Pro":
                perplexity_url = "https://api.perplexity.ai/chat/completions"
                
                content = "Find me 3 competitor company URLs similar to the company with "
                if url and description:
                    content += f"URL: {url} and description: {description}"
                elif url:
                    content += f"URL: {url}"
                else:
                    content += f"description: {description}"
                content += ". ONLY RESPOND WITH THE URLS, NO OTHER TEXT."

                payload = {
                    "model": "sonar-pro",
                    "messages": [
                        {
                            "role": "system",
                            "content": "Be precise and only return 3 company URLs ONLY."
                        },
                        {
                            "role": "user",
                            "content": content
                        }
                    ],
                    "max_tokens": 1000,
                    "temperature": 0.2,
                }
                
                headers = {
                    "Authorization": f"Bearer {st.session_state.perplexity_api_key}",
                    "Content-Type": "application/json"
                }

                try:
                    response = requests.post(perplexity_url, json=payload, headers=headers)
                    response.raise_for_status()
                    urls = response.json()['choices'][0]['message']['content'].strip().split('\n')
                    return [url.strip() for url in urls if url.strip()]
                except Exception as e:
                    st.error(f"Error fetching competitor URLs from Perplexity: {str(e)}")
                    return []

            else:  # Exa AI
                try:
                    if url:
                        result = exa.find_similar(
                            url=url,
                            num_results=3,
                            exclude_source_domain=True,
                            category="company"
                        )
                    else:
                        result = exa.search(
                            description,
                            type="neural",
                            category="company",
                            use_autoprompt=True,
                            num_results=3
                        )
                    return [item.url for item in result.results]
                except Exception as e:
                    st.error(f"Error fetching competitor URLs from Exa: {str(e)}")
                    return []

        class CompetitorDataSchema(BaseModel):
            company_name: str = Field(description="Name of the company")
            pricing: str = Field(description="Pricing details, tiers, and plans")
            key_features: List[str] = Field(description="Main features and capabilities of the product/service")
            tech_stack: List[str] = Field(description="Technologies, frameworks, and tools used")
            marketing_focus: str = Field(description="Main marketing angles and target audience")
            customer_feedback: str = Field(description="Customer testimonials, reviews, and feedback")

        def extract_competitor_info(competitor_url: str) -> Optional[dict]:
            try:
                # Initialize FirecrawlApp with API key
                app = FirecrawlApp(api_key=st.session_state.firecrawl_api_key)
                
                # Add wildcard to crawl subpages
                url_pattern = f"{competitor_url}/*"
                
                extraction_prompt = """
                Extract detailed information about the company's offerings, including:
                - Company name and basic information
                - Pricing details, plans, and tiers
                - Key features and main capabilities
                - Technology stack and technical details
                - Marketing focus and target audience
                - Customer feedback and testimonials
                
                Analyze the entire website content to provide comprehensive information for each field.
                """
                
                response = app.extract(
                    [url_pattern],
                    {
                        'prompt': extraction_prompt,
                        'schema': CompetitorDataSchema.model_json_schema(),
                    }
                )
                
                if response.get('success') and response.get('data'):
                    extracted_info = response['data']
                    
                    # Create JSON structure
                    competitor_json = {
                        "competitor_url": competitor_url,
                        "company_name": extracted_info.get('company_name', 'N/A'),
                        "pricing": extracted_info.get('pricing', 'N/A'),
                        "key_features": extracted_info.get('key_features', [])[:5],  # Top 5 features
                        "tech_stack": extracted_info.get('tech_stack', [])[:5],      # Top 5 tech stack items
                        "marketing_focus": extracted_info.get('marketing_focus', 'N/A'),
                        "customer_feedback": extracted_info.get('customer_feedback', 'N/A')
                    }
                    
                    return competitor_json
                    
                else:
                    return None
                    
            except Exception as e:
                return None

        def generate_comparison_report(competitor_data: list) -> None:
            # Format the competitor data for the prompt
            formatted_data = json.dumps(competitor_data, indent=2)
            print(formatted_data)
            
            # Updated system prompt for more structured output
            system_prompt = f"""
            As an expert business analyst, analyze the following competitor data in JSON format and create a structured comparison.
            Extract and summarize the key information into concise points.

            {formatted_data}

            Return the data in a structured format with EXACTLY these columns:
            Company, Pricing, Key Features, Tech Stack, Marketing Focus, Customer Feedback

            Rules:
            1. For Company: Include company name and URL
            2. For Key Features: List top 3 most important features only
            3. For Tech Stack: List top 3 most relevant technologies only
            4. Keep all entries clear and concise
            5. Format feedback as brief quotes
            6. Return ONLY the structured data, no additional text
            """

            # Get comparison data from agent
            comparison_response = comparison_agent.run(system_prompt)
            
            try:
                # Split the response into lines and clean them
                table_lines = [
                    line.strip() 
                    for line in comparison_response.content.split('\n') 
                    if line.strip() and '|' in line
                ]
                
                # Extract headers (first row)
                headers = [
                    col.strip() 
                    for col in table_lines[0].split('|') 
                    if col.strip()
                ]
                
                # Extract data rows (skip header and separator rows)
                data_rows = []
                for line in table_lines[2:]:  # Skip header and separator rows
                    row_data = [
                        cell.strip() 
                        for cell in line.split('|') 
                        if cell.strip()
                    ]
                    if len(row_data) == len(headers):
                        data_rows.append(row_data)
                
                # Create DataFrame
                df = pd.DataFrame(
                    data_rows,
                    columns=headers
                )
                
                # Display the table
                st.subheader("Competitor Comparison")
                st.table(df)
                
            except Exception as e:
                st.error(f"Error creating comparison table: {str(e)}")
                st.write("Raw comparison data for debugging:", comparison_response.content)

        def generate_analysis_report(competitor_data: list):
            # Format the competitor data for the prompt
            formatted_data = json.dumps(competitor_data, indent=2)
            print("Analysis Data:", formatted_data)  # For debugging
            
            report = analysis_agent.run(
                f"""Analyze the following competitor data in JSON format and identify market opportunities to improve my own company:
                
                {formatted_data}

                Tasks:
                1. Identify market gaps and opportunities based on competitor offerings
                2. Analyze competitor weaknesses that we can capitalize on
                3. Recommend unique features or capabilities we should develop
                4. Suggest pricing and positioning strategies to gain competitive advantage
                5. Outline specific growth opportunities in underserved market segments
                6. Provide actionable recommendations for product development and go-to-market strategy

                Focus on finding opportunities where we can differentiate and do better than competitors.
                Highlight any unmet customer needs or pain points we can address.
                """
            )
            return report.content

        # Run analysis when the user clicks the button
        if st.button("Analyze Competitors"):
            if url or description:
                with st.spinner("Fetching competitor URLs..."):
                    competitor_urls = get_competitor_urls(url=url, description=description)
                    st.write(f"Competitor URLs: {competitor_urls}")
                
                competitor_data = []
                for comp_url in competitor_urls:
                    with st.spinner(f"Analyzing Competitor: {comp_url}..."):
                        competitor_info = extract_competitor_info(comp_url)
                        if competitor_info is not None:
                            competitor_data.append(competitor_info)
                
                if competitor_data:
                    # Generate and display comparison report
                    with st.spinner("Generating comparison table..."):
                        generate_comparison_report(competitor_data)
                    
                    # Generate and display final analysis report
                    with st.spinner("Generating analysis report..."):
                        analysis_report = generate_analysis_report(competitor_data)
                        st.subheader("Competitor Analysis Report")
                        st.markdown(analysis_report)
                    
                    st.success("Analysis complete!")
                else:
                    st.error("Could not extract data from any competitor URLs")
            else:
                st.error("Please provide either a URL or a description.")
                import streamlit as st
from exa_py import Exa
from agno.agent import Agent
from agno.tools.firecrawl import FirecrawlTools
from agno.models.openai import OpenAIChat
from agno.tools.duckduckgo import DuckDuckGoTools
import pandas as pd
import requests
from firecrawl import FirecrawlApp
from pydantic import BaseModel, Field
from typing import List, Optional
import json

# Streamlit UI
st.set_page_config(page_title="AI Competitor Intelligence Agent Team", layout="wide")

# Sidebar for API keys
st.sidebar.title("API Keys")
openai_api_key = st.sidebar.text_input("OpenAI API Key", type="password")
firecrawl_api_key = st.sidebar.text_input("Firecrawl API Key", type="password")

# Add search engine selection before API keys
search_engine = st.sidebar.selectbox(
    "Select Search Endpoint",
    options=["Perplexity AI - Sonar Pro", "Exa AI"],
    help="Choose which AI service to use for finding competitor URLs"
)

# Show relevant API key input based on selection
if search_engine == "Perplexity AI - Sonar Pro":
    perplexity_api_key = st.sidebar.text_input("Perplexity API Key", type="password")
    # Store API keys in session state
    if openai_api_key and firecrawl_api_key and perplexity_api_key:
        st.session_state.openai_api_key = openai_api_key
        st.session_state.firecrawl_api_key = firecrawl_api_key
        st.session_state.perplexity_api_key = perplexity_api_key
    else:
        st.sidebar.warning("Please enter all required API keys to proceed.")
else:  # Exa AI
    exa_api_key = st.sidebar.text_input("Exa API Key", type="password")
    # Store API keys in session state
    if openai_api_key and firecrawl_api_key and exa_api_key:
        st.session_state.openai_api_key = openai_api_key
        st.session_state.firecrawl_api_key = firecrawl_api_key
        st.session_state.exa_api_key = exa_api_key
    else:
        st.sidebar.warning("Please enter all required API keys to proceed.")

# Main UI
st.title("🧲 AI Competitor Intelligence Agent Team")
st.info(
    """
    This app helps businesses analyze their competitors by extracting structured data from competitor websites and generating insights using AI.
    - Provide a **URL** or a **description** of your company.
    - The app will fetch competitor URLs, extract relevant information, and generate a detailed analysis report.
    """
)
st.success("For better results, provide both URL and a 5-6 word description of your company!")

# Input fields for URL and description
url = st.text_input("Enter your company URL :")
description = st.text_area("Enter a description of your company (if URL is not available):")

# Initialize API keys and tools
if "openai_api_key" in st.session_state and "firecrawl_api_key" in st.session_state:
    if (search_engine == "Perplexity AI - Sonar Pro" and "perplexity_api_key" in st.session_state) or \
       (search_engine == "Exa AI" and "exa_api_key" in st.session_state):
        
        # Initialize Exa only if selected
        if search_engine == "Exa AI":
            exa = Exa(api_key=st.session_state.exa_api_key)

        firecrawl_tools = FirecrawlTools(
            api_key=st.session_state.firecrawl_api_key,
            scrape=False,
            crawl=True,
            limit=5
        )

        firecrawl_agent = Agent(
            model=OpenAIChat(id="gpt-4o", api_key=st.session_state.openai_api_key),
            tools=[firecrawl_tools, DuckDuckGoTools()],
            show_tool_calls=True,
            markdown=True
        )

        analysis_agent = Agent(
            model=OpenAIChat(id="gpt-4o", api_key=st.session_state.openai_api_key),
            show_tool_calls=True,
            markdown=True
        )

        # New agent for comparing competitor data
        comparison_agent = Agent(
            model=OpenAIChat(id="gpt-4o", api_key=st.session_state.openai_api_key),
            show_tool_calls=True,
            markdown=True
        )

        def get_competitor_urls(url: str = None, description: str = None) -> list[str]:
            if not url and not description:
                raise ValueError("Please provide either a URL or a description.")

            if search_engine == "Perplexity AI - Sonar Pro":
                perplexity_url = "https://api.perplexity.ai/chat/completions"
                
                content = "Find me 3 competitor company URLs similar to the company with "
                if url and description:
                    content += f"URL: {url} and description: {description}"
                elif url:
                    content += f"URL: {url}"
                else:
                    content += f"description: {description}"
                content += ". ONLY RESPOND WITH THE URLS, NO OTHER TEXT."

                payload = {
                    "model": "sonar-pro",
                    "messages": [
                        {
                            "role": "system",
                            "content": "Be precise and only return 3 company URLs ONLY."
                        },
                        {
                            "role": "user",
                            "content": content
                        }
                    ],
                    "max_tokens": 1000,
                    "temperature": 0.2,
                }
                
                headers = {
                    "Authorization": f"Bearer {st.session_state.perplexity_api_key}",
                    "Content-Type": "application/json"
                }

                try:
                    response = requests.post(perplexity_url, json=payload, headers=headers)
                    response.raise_for_status()
                    urls = response.json()['choices'][0]['message']['content'].strip().split('\n')
                    return [url.strip() for url in urls if url.strip()]
                except Exception as e:
                    st.error(f"Error fetching competitor URLs from Perplexity: {str(e)}")
                    return []

            else:  # Exa AI
                try:
                    if url:
                        result = exa.find_similar(
                            url=url,
                            num_results=3,
                            exclude_source_domain=True,
                            category="company"
                        )
                    else:
                        result = exa.search(
                            description,
                            type="neural",
                            category="company",
                            use_autoprompt=True,
                            num_results=3
                        )
                    return [item.url for item in result.results]
                except Exception as e:
                    st.error(f"Error fetching competitor URLs from Exa: {str(e)}")
                    return []

        class CompetitorDataSchema(BaseModel):
            company_name: str = Field(description="Name of the company")
            pricing: str = Field(description="Pricing details, tiers, and plans")
            key_features: List[str] = Field(description="Main features and capabilities of the product/service")
            tech_stack: List[str] = Field(description="Technologies, frameworks, and tools used")
            marketing_focus: str = Field(description="Main marketing angles and target audience")
            customer_feedback: str = Field(description="Customer testimonials, reviews, and feedback")

        def extract_competitor_info(competitor_url: str) -> Optional[dict]:
            try:
                # Initialize FirecrawlApp with API key
                app = FirecrawlApp(api_key=st.session_state.firecrawl_api_key)
                
                # Add wildcard to crawl subpages
                url_pattern = f"{competitor_url}/*"
                
                extraction_prompt = """
                Extract detailed information about the company's offerings, including:
                - Company name and basic information
                - Pricing details, plans, and tiers
                - Key features and main capabilities
                - Technology stack and technical details
                - Marketing focus and target audience
                - Customer feedback and testimonials
                
                Analyze the entire website content to provide comprehensive information for each field.
                """
                
                response = app.extract(
                    [url_pattern],
                    {
                        'prompt': extraction_prompt,
                        'schema': CompetitorDataSchema.model_json_schema(),
                    }
                )
                
                if response.get('success') and response.get('data'):
                    extracted_info = response['data']
                    
                    # Create JSON structure
                    competitor_json = {
                        "competitor_url": competitor_url,
                        "company_name": extracted_info.get('company_name', 'N/A'),
                        "pricing": extracted_info.get('pricing', 'N/A'),
                        "key_features": extracted_info.get('key_features', [])[:5],  # Top 5 features
                        "tech_stack": extracted_info.get('tech_stack', [])[:5],      # Top 5 tech stack items
                        "marketing_focus": extracted_info.get('marketing_focus', 'N/A'),
                        "customer_feedback": extracted_info.get('customer_feedback', 'N/A')
                    }
                    
                    return competitor_json
                    
                else:
                    return None
                    
            except Exception as e:
                return None

        def generate_comparison_report(competitor_data: list) -> None:
            # Format the competitor data for the prompt
            formatted_data = json.dumps(competitor_data, indent=2)
            print(formatted_data)
            
            # Updated system prompt for more structured output
            system_prompt = f"""
            As an expert business analyst, analyze the following competitor data in JSON format and create a structured comparison.
            Extract and summarize the key information into concise points.

            {formatted_data}

            Return the data in a structured format with EXACTLY these columns:
            Company, Pricing, Key Features, Tech Stack, Marketing Focus, Customer Feedback

            Rules:
            1. For Company: Include company name and URL
            2. For Key Features: List top 3 most important features only
            3. For Tech Stack: List top 3 most relevant technologies only
            4. Keep all entries clear and concise
            5. Format feedback as brief quotes
            6. Return ONLY the structured data, no additional text
            """

            # Get comparison data from agent
            comparison_response = comparison_agent.run(system_prompt)
            
            try:
                # Split the response into lines and clean them
                table_lines = [
                    line.strip() 
                    for line in comparison_response.content.split('\n') 
                    if line.strip() and '|' in line
                ]
                
                # Extract headers (first row)
                headers = [
                    col.strip() 
                    for col in table_lines[0].split('|') 
                    if col.strip()
                ]
                
                # Extract data rows (skip header and separator rows)
                data_rows = []
                for line in table_lines[2:]:  # Skip header and separator rows
                    row_data = [
                        cell.strip() 
                        for cell in line.split('|') 
                        if cell.strip()
                    ]
                    if len(row_data) == len(headers):
                        data_rows.append(row_data)
                
                # Create DataFrame
                df = pd.DataFrame(
                    data_rows,
                    columns=headers
                )
                
                # Display the table
                st.subheader("Competitor Comparison")
                st.table(df)
                
            except Exception as e:
                st.error(f"Error creating comparison table: {str(e)}")
                st.write("Raw comparison data for debugging:", comparison_response.content)

        def generate_analysis_report(competitor_data: list):
            # Format the competitor data for the prompt
            formatted_data = json.dumps(competitor_data, indent=2)
            print("Analysis Data:", formatted_data)  # For debugging
            
            report = analysis_agent.run(
                f"""Analyze the following competitor data in JSON format and identify market opportunities to improve my own company:
                
                {formatted_data}

                Tasks:
                1. Identify market gaps and opportunities based on competitor offerings
                2. Analyze competitor weaknesses that we can capitalize on
                3. Recommend unique features or capabilities we should develop
                4. Suggest pricing and positioning strategies to gain competitive advantage
                5. Outline specific growth opportunities in underserved market segments
                6. Provide actionable recommendations for product development and go-to-market strategy

                Focus on finding opportunities where we can differentiate and do better than competitors.
                Highlight any unmet customer needs or pain points we can address.
                """
            )
            return report.content

        # Run analysis when the user clicks the button
        if st.button("Analyze Competitors"):
            if url or description:
                with st.spinner("Fetching competitor URLs..."):
                    competitor_urls = get_competitor_urls(url=url, description=description)
                    st.write(f"Competitor URLs: {competitor_urls}")
                
                competitor_data = []
                for comp_url in competitor_urls:
                    with st.spinner(f"Analyzing Competitor: {comp_url}..."):
                        competitor_info = extract_competitor_info(comp_url)
                        if competitor_info is not None:
                            competitor_data.append(competitor_info)
                
                if competitor_data:
                    # Generate and display comparison report
                    with st.spinner("Generating comparison table..."):
                        generate_comparison_report(competitor_data)
                    
                    # Generate and display final analysis report
                    with st.spinner("Generating analysis report..."):
                        analysis_report = generate_analysis_report(competitor_data)
                        st.subheader("Competitor Analysis Report")
                        st.markdown(analysis_report)
                    
                    st.success("Analysis complete!")
                else:
                    st.error("Could not extract data from any competitor URLs")
            else:
                st.error("Please provide either a URL or a description.")