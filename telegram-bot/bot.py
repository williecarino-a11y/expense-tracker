from telegram import Update
from telegram.ext import Application, CommandHandler, ContextTypes

TOKEN = "YOUR_BOT_TOKEN"

async def start(update: Update, context: ContextTypes.DEFAULT_TYPE):
    await update.message.reply_text("Hello! I'm alive.")

app = Application.builder().token(8916405095:AAGu8V3aLJY5vA56UsYDFGOMzOHespg5kgM).build()
app.add_handler(CommandHandler("start", start))

app.run_polling()
