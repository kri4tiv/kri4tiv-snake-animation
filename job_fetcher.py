import requests
from bs4 import BeautifulSoup

class JobFetcher:
    def __init__(self):
        self.job_sites = {
            'LinkedIn': 'https://www.linkedin.com/jobs/search/?keywords=marketing&location=UK',
            'Welcome to the Jungle': 'https://www.welcometothejungle.com/en/jobs/search?q=marketing&location=UK',
            'BambooHR': 'https://www.bamboohr.com/job-search/?q=marketing&place=UK'
        }

    def fetch_jobs(self):
        all_jobs = []
        for site, url in self.job_sites.items():
            response = requests.get(url)
            if response.status_code == 200:
                all_jobs.extend(self.parse_site(site, response.text))
            else:
                print(f'Failed to retrieve jobs from {site}')
        return all_jobs

    def parse_site(self, site, html):
        jobs = []
        soup = BeautifulSoup(html, 'html.parser')
        if site == 'LinkedIn':
            job_cards = soup.find_all('div', class_='job-card-container')
            for job in job_cards:
                title = job.find('h3').text.strip()
                jobs.append(title)
        elif site == 'Welcome to the Jungle':
            job_cards = soup.find_all('div', class_='JobCard')
            for job in job_cards:
                title = job.find('h3').text.strip()
                jobs.append(title)
        elif site == 'BambooHR':
            job_cards = soup.find_all('div', class_='job-title')
            for job in job_cards:
                title = job.text.strip()
                jobs.append(title)
        return jobs

if __name__ == '__main__':
    fetcher = JobFetcher()
    jobs = fetcher.fetch_jobs()
    print('Fetched jobs:', jobs)