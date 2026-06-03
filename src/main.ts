import './style.scss'



// Shape of Expense Objects
type Expense = {
  id: string
  title: string
  amount: number
  category: string
  date: string
}


  
// Expenses Array to hold generated expense Objects
const expenses: Expense[] = []



// Calculates expense total
const getTotalSpent = () => expenses.reduce((sum, expense) => {
  return sum + expense.amount
}, 0)

// Initial SETUP Function
function initialSetup() {
  const app = document.getElementById('app')
    if(!app) {
      throw new Error('App container not found')
    }
  // App Shell render
    app.innerHTML = `<section>
      <header>
        <h1>Expense Tracker</h1>
      </header>
    </section>
    <section class="form-container">
      <form action="" class='expense-form'>
        <label for='title'>Title</label>
        <input type='text' id='title' name='expense-title'/>

        <label for='amount'>Amount</label>
        <input type='number' id='amount' name='expense-amount'/>

        <label for='category'>Category</label>
        <input type='text' id='category' name='categories'/>

        <label for='date'>Date</label>
        <input type='date' id='date' name='dates' min='2026-04-23' max='2026-12-12'/>
        <button type="submit">Submit expense</button>
      </form>
    </section>

    <section>
      <div class="expense-list-container">
      <h2>Expenses</h2>
        <ul class="expense-list">
        </ul>
      </div>
    </section>
    
    <section>
    <div class="expense-summary">
    <h2>Summary</h2>
      <p>Total expenses: ${expenses.length}</p>
    </div>
    <div class='expense-display'>
      <h2>Total spent</h2>
      <p class='expense-total-disp'>Expense total: $${getTotalSpent().toFixed(2)}</p>
    </div>
  </section>
  `

  // APP SHELL UI elements
  const expenseForm = document.querySelector('.expense-form') // Form
  const inputTitle = document.getElementById('title') as HTMLInputElement // Input Title
  const inputAmount = document.getElementById('amount') as HTMLInputElement // Input Amount
  const inputCategory = document.getElementById('category') as HTMLInputElement // Input Category
  const inputDate = document.getElementById('date') as HTMLInputElement // Input Date
  
  let expenseTotalDisp = document.querySelector('.expense-total-disp') as HTMLElement // Total Display
    if (!expenseTotalDisp) {
      throw new Error('Expense display missing')
    }
    
  // Checks INPUT fields exist 
  if (!inputTitle || !inputAmount || !inputCategory || !inputDate) {
      throw new Error('Input fields not found')
    }
  
    // Form guard check
  if (!expenseForm) {
  throw new Error('Expense form not found')
  }
    // Checks Total Expense display exists
  if (!expenseTotalDisp) {
  throw new Error("Expense display doesn't exist")
  }

  // Form Submit listener
  expenseForm.addEventListener('submit', (e) => {
      e.preventDefault()
        const titleValue = inputTitle.value.trim()
        const amountValue = inputAmount.value
        const categoryValue = inputCategory.value.trim()
        const dateValue = inputDate.value

        
  
        const newExpense: Expense = {
          id: crypto.randomUUID(),
          title: titleValue,
          amount: Number(amountValue),
          category: categoryValue,
          date: dateValue
      }
      expenses.push(newExpense)
      console.log('Form submitted')
      console.log(expenses)
      renderExpenses()

      
      
      inputTitle.value = ''
      inputAmount.value = ''
      inputCategory.value = ''
      inputDate.value = ''
    })

}
// Initial SETUP End



  
// Render Expenses function
function renderExpenses() {

  const expenseList = document.querySelector('.expense-list') // Expense List
  const summaryText = document.querySelector('.expense-summary p') // Summary Info
  const expenseTotalDisp = document.querySelector('.expense-total-disp') as HTMLElement // Total Display
  

  if (!expenseList || !summaryText || !expenseTotalDisp) {
    throw new Error('Required elements not found')
  }

  // Expense List click listener instead of buttons having to create new one every re-render
  expenseList.addEventListener('click', (event) => {
    const target = event.target as HTMLElement
      if (!target) {
        throw new Error("Target not found")
      }
  })

  // Expense Item Structure mapping from expenses Array to variable
  const expenseItemMarkup = expenses.map((expense) => {
  return`
    <li class="list-item">
    <h3>${expense.title}</h3>
    <p>Amount: $${expense.amount.toFixed(2)}</p>
    <p>Category: ${expense.category}</p>
    <p>Date: ${expense.date}</p>
    <button class="expense-delete" data-expense-id="${expense.id}">Remove</button>
    </li>
    `
  }).join('')
  

  expenseList.innerHTML = expenseItemMarkup
  summaryText.textContent = `Total expenses: ${expenses.length}`
  expenseTotalDisp.textContent = `Expense total: $${getTotalSpent().toFixed(2)}`

  
  const deleteBtn = document.querySelector('.expense-delete') as HTMLElement
          if (!deleteBtn) {
           throw new Error("Delete button does't exist")
         }

        if (deleteBtn) {
          deleteBtn.addEventListener('click', () => {
          const expenseId = deleteBtn.getAttribute('data-expense-id')

          if (!expenseId) return
          console.log(expenseId)
          const expenseIndex = expenses.findIndex((expense) => expense.id === expenseId)
          
          if (expenseIndex === -1) return
          expenses.splice(expenseIndex, 1)
          console.log(expenses)
          renderExpenses()
        }
      )}
}
// End of Render Expenses Function

      initialSetup()