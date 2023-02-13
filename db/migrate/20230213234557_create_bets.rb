class CreateBets < ActiveRecord::Migration[6.1]
  def change
    create_table :bets do |t|
      t.integer :user_id
      t.integer :game_id
      t.string :category
      t.string :description
      t.string :odds

      t.timestamps
    end
  end
end
