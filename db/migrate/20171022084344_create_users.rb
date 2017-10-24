class CreateUsers < ActiveRecord::Migration[5.1]
  def change
    create_table :users, id: :uuid do |t|
      t.integer :number
      t.string :state

      t.timestamps
    end
  end
end
