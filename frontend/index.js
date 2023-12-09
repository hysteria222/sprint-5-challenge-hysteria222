async function sprintChallenge5() { // Note the async keyword, in case you wish to use `await` inside sprintChallenge5
  // 👇 WORK WORK BELOW THIS LINE 👇

  const footer = document.querySelector('footer')
  const currentYear = new Date().getFullYear()
  footer.textContent = `© BLOOM INSTITUTE OF TECHNOLOGY ${currentYear}`

      try{
        const learners ='http://localhost:3003/api/learners'
        const mentors = 'http://localhost:3003/api/mentors'
        
        const resp1 = await axios.get(learners)
        const resp2 = await axios.get(mentors)
    
        const learnersObj = resp1.data
        const mentorsObj = resp2.data

        const fullArray = learnersObj.map((learner) => {
          if (!learner.mentors) {
            return learner;
          }
          return {
            ...learner,
            mentors: learner.mentors.map((id) => {
              const mentor = mentorsObj.find((data) => data.id === id);
              return mentor.firstName + ' ' + mentor.lastName;
            })
          };
        });

        
        
        

        const cardMaker = learner => {
          const card = document.createElement('div');
          card.classList.add('card');
          document.querySelector('.cards').appendChild(card)
          const name = document.createElement('h3');
          name.textContent = learner.fullName;
          card.appendChild(name);
          const email = document.createElement('div');
          card.appendChild(email);
          email.textContent = learner.email;
          const mentorHeading = document.createElement('h4');
          mentorHeading.textContent = 'Mentors'
          mentorHeading.classList.add('closed');
          card.appendChild(mentorHeading);


          const mentorList = document.createElement('ul');
          card.appendChild(mentorList);
          learner.mentors.forEach((element, i) => {
          const mentorsListItem = document.createElement('li')
          mentorsListItem.textContent = learner.mentors[i]
          mentorList.appendChild(mentorsListItem)})

          mentorList.style.display = 'none'


          document.querySelector('.info').textContent = 'No learner is selected'

          card.addEventListener('click', evt => {
            console.log(evt.target)

            document.querySelector('.info').textContent = `The selected learner is ${learner.fullName}`

            if(card.classList.contains('selected')){
              card.classList.remove('selected')
              document.querySelector('.info').textContent = 'No learner is selected'
            } else {
              const cards = document.querySelectorAll('.card')
              cards.forEach((element) => {
              element.classList.remove('selected')})
              card.classList.add('selected')
            }
            
          })
          
          return card
      }

      fullArray.forEach(cardMaker);

  } catch (err) {
    console.log(err.message)
  }
  
  // 👆 WORK WORK ABOVE THIS LINE 👆
}

// ❗ DO NOT CHANGE THE CODE  BELOW
if (typeof module !== 'undefined' && module.exports) module.exports = { sprintChallenge5 }
else sprintChallenge5()
