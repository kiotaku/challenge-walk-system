class CreateUsers < ActiveRecord::Migration[5.1]
  def change
    create_table :users, id: :uuid do |t|
      t.integer :number, unique: true
      t.string :state, default: 'joining'

      t.timestamps
    end
  end
end
